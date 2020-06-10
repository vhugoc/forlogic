/** @module UserController */

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../configs/auth.json');

class UserController {

    /**
     * Show user profile
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async show(request, response) {
        try {
            const user = await User.findOne({ _id: request.user_id });
            return response.json(user);
        } catch(err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }

    /**
     * Authenticate an user
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async authenticate(request, response) {
        try{
            const { email, password } = request.body;
        
            if (!email || !password)
                return response.status(400).json({ success: false, message: "Empty data" });
            
            const user = await User.findOne({ email });

            if (!user)
                return response.status(400).json({ success: false, message: "User does not exists" });
            
            if (!bcrypt.compareSync(password, user.password))
                return response.status(400).json({ success: false, message: "Invalid password" });

            const token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 86400 * 7
            });
            
            user.password = undefined;

            return response.status(200).json({ success: true, message: "User successfully logged in", token, user });

        } catch(err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }

    /**
     * Register an user
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async register(request, response) {
        try{
            const { name, email, password } = request.body;

            if (!name || !email || !password) 
                return response.status(400).json({ success: false, message: "Empty data" });

            const user = await User.findOne({
                email: { $eq: email }
            });
            
            if (user)
                return response.status(400).json({ success: false, message: "User already exists" });

            const register = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            });

            if (!register)
                return response.status(500).json({ success: false, message: "Internal error" });

            register.password = undefined;

            return response.status(200).json({ success: true, message: "User successfully registered", user: register });
      
        } catch (err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }
}

module.exports = UserController;
