import express from 'express';
import {
    registerUser,
    authUser,
    logoutUser,
    getUsers,           // DODATO: uzimanje svih korisnika
    updateUserRoles,    // DODATO: izmena uloga
    addCard             // DODATO: dodavanje kartice
} from '../controllers/userController.js';

// Uvezi middleware-e za zaštitu (prilagodi putanju ako ti se fajl zove drugačije)
// npr. '../middleware/authMiddleware.js'
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/// JAVNE RUTE
router.post('/login', authUser);
router.post('/logout', logoutUser);

// DODAJ KARTICU
router.post('/add-card', protect, addCard);

// REGISTRACIJA + SVI KORISNICI
router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);

// IZMENA ULOGA
router.route('/:id/roles')
    .put(protect, admin, updateUserRoles);
export default router;