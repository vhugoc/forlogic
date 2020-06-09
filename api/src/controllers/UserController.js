const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserController {
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
                return response.status(200).json({ success: false, message: "User already exists" });

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
