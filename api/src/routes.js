const express = require('express');

const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/UserController');
const ClientController = require('./controllers/ClientController');
const User = new UserController();
const Client = new ClientController();

router = express.Router();

router.post('/user/register', User.register);
router.post('/signin', User.authenticate);
router.get('/profile', authMiddleware, User.show);

router.get('/clients', authMiddleware, Client.index);
router.get('/clients/:id', authMiddleware, Client.show);
router.post('/clients', authMiddleware, Client.create);
router.put('/clients/:id', authMiddleware, Client.update);
router.delete('/clients/:id', authMiddleware, Client.remove);

module.exports = router;
