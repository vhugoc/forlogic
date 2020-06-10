const express = require('express');

const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/UserController');
const User = new UserController();

router = express.Router();

router.post('/user/register', User.register);
router.post('/signin', User.authenticate);
router.get('/profile', authMiddleware, User.show);

module.exports = router;
