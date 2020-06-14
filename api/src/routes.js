const express = require('express');

const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/UserController');
const ClientController = require('./controllers/ClientController');
const RatingController = require('./controllers/RatingController');
const User = new UserController();
const Client = new ClientController();
const Rating = new RatingController();

router = express.Router();

/**
 * User Requests
 */
router.post('/user/register', User.register);
router.post('/signin', User.authenticate);
router.get('/profile', authMiddleware, User.show);

/**
 * Clients Requests
 */
router.get('/clients', authMiddleware, Client.index);
router.get('/clients/:id', authMiddleware, Client.show);
router.post('/clients', authMiddleware, Client.create);
router.put('/clients/:id', authMiddleware, Client.update);
router.delete('/clients/:id', authMiddleware, Client.remove);

/**
 * Ratings Requests
 */
router.get('/ratings', authMiddleware, Rating.index);
router.get('/ratings/:id', authMiddleware, Rating.show);
router.post('/ratings', authMiddleware, Rating.create);
router.delete('/ratings/:id', authMiddleware, Rating.remove);

module.exports = router;
