import express from 'express';
import {
    registerUser,
    authUser,
    logoutUser,
    getUsers,
    updateUserRoles,
    addCard,
    getCards,
    deleteCard,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// JAVNE RUTE
router.post('/login', authUser);
router.post('/logout', logoutUser);

// KARTICE (stavljene iznad '/:id/roles' da ne dođe do mešanja putanja)
router.route('/cards')
    .post(protect, addCard)
    .get(protect, getCards);

router.route('/cards/:id')
    .delete(protect, deleteCard);

// REGISTRACIJA + SVI KORISNICI
router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);

// IZMENA ULOGA
router.route('/:id/roles')
    .put(protect, admin, updateUserRoles);

export default router;