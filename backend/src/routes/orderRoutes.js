import express from 'express';

import {
    createOrder,
    getMyOrders,
    markOrderAsPaid,
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);

router.get('/myorders', protect, getMyOrders);

router.put('/:id/pay', protect, markOrderAsPaid);

export default router;