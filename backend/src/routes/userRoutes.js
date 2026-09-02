import express from 'express';
import {
    registerUser,
    authUser,
    logoutUser,
    getUsers,
    updateUserRoles,
    updateUserProfile,
    addCard,
    getCards,
    adminLogin,
    deleteUser,
    deleteCard,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// JAVNE RUTE
router.post('/login', authUser);
router.post('/admin-login', adminLogin);
router.post('/logout', logoutUser);

router.put('/profile', protect, updateUserProfile);
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

//brisanje naloga korisnika - admin
router.delete('/:id', protect, admin, deleteUser);

// IZMENA ULOGA
router.route('/:id/roles')
    .put(protect, admin, updateUserRoles);

export default router;