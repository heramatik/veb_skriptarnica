import Order from '../models/orderModel.js';

const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            selectedCard,
            itemsPrice,
            discountPercentage,
            discountAmount,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                message: 'Porudžbina nema artikle',
            });
        }

        if (!paymentMethod) {
            return res.status(400).json({
                message: 'Način plaćanja nije izabran',
            });
        }

        const order = new Order({
            user: req.user?._id || null,
            orderItems,
            shippingAddress,
            paymentMethod,
            selectedCard: selectedCard || null,
            itemsPrice,
            discountPercentage: discountPercentage || 0,
            discountAmount: discountAmount || 0,
            totalPrice,
            isPaid: paymentMethod === 'Kartica',
            paidAt: paymentMethod === 'Kartica' ? new Date() : null,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Create order error:', error);

        res.status(500).json({
            message: 'Greška prilikom kreiranja porudžbine',
        });
    }
};

export { createOrder };