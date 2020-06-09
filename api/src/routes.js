const express = require('express');

const UserController = require('./controllers/UserController');
const User = new UserController();

router = express.Router();

router.post('/user/register', User.register);

module.exports = router;
