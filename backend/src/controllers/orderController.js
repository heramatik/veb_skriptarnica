import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

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

        const user = await User.findById(req.user._id);

        if (user) {
            const orderCount = await Order.countDocuments({
                user: user._id,
            });

            if (orderCount >= 5 && !user.isLoyalCustomer) {
                user.isLoyalCustomer = true;
                await user.save();
            }
        }
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Create order error:', error);

        res.status(500).json({
            message: 'Greška prilikom kreiranja porudžbine',
        });
    }
    

};
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error('Get my orders error:', error);

        res.status(500).json({
            message: 'Greška prilikom učitavanja porudžbina',
        });
    }
};

export {
    createOrder,
    getMyOrders,
};