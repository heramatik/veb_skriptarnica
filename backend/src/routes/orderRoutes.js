import express from 'express';

import {
    createOrder,
    getMyOrders,
    getAllOrders,
    markOrderAsPaid,
} from '../controllers/orderController.js';

import {
    protect,
    staffOrAdmin,
    admin,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);

router.get('/myorders', protect, getMyOrders);

// ADMIN - sve porudžbine
router.get('/', protect, admin, getAllOrders);

// KONOBAR ILI ADMIN - potvrda plaćanja
router.put('/:id/pay', protect, staffOrAdmin, markOrderAsPaid);

export default router;