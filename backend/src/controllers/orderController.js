import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            selectedCard,
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

        // ==============================
        // PRONALAZIMO KORISNIKA
        // ==============================

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: 'Korisnik nije pronađen',
            });
        }

        // ==============================
        // CENA ARTIKALA
        // ==============================

        const itemsPrice = orderItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
        );

        // ==============================
        // POPUST
        // ==============================

        let discountPercentage = 0;

        if (user.isAdmin) {
            discountPercentage = 100;
        } else if (user.isManager) {
            discountPercentage = 100;
        } else if (user.isWaiter) {
            discountPercentage = 30;
        } else if (user.isLoyalCustomer) {
            discountPercentage = 15;
        }

        const discountAmount =
            (itemsPrice * discountPercentage) / 100;

        const totalPrice =
            itemsPrice - discountAmount;

        // ==============================
        // KREIRANJE PORUDŽBINE
        // ==============================

        const order = new Order({
            user: user._id,

            orderItems,

            shippingAddress,

            paymentMethod,

            selectedCard: selectedCard || null,

            itemsPrice,

            discountPercentage,

            discountAmount,

            totalPrice,

            // DEMO PLAĆANJE
            isPaid: paymentMethod === 'Kartica',

            paidAt:
                paymentMethod === 'Kartica'
                    ? new Date()
                    : null,
        });

        const createdOrder = await order.save();

        // ==============================
        // PROVERA LOYALTY PROGRAMA
        // ==============================

        const successfulOrders = await Order.countDocuments({
            user: user._id,
            $or: [
                { isPaid: true },
                { isDelivered: true },
            ],
        });

        if (
            successfulOrders >= 5 &&
            !user.isLoyalCustomer
        ) {
            user.isLoyalCustomer = true;

            await user.save();

            console.log(
                `⭐ ${user.email} je postao Stalan Gost!`
            );
        }

        res.status(201).json(createdOrder);

    } catch (error) {
        console.error('Create order error:', error);

        res.status(500).json({
            message: 'Greška prilikom kreiranja porudžbine',
        });
    }
};


// ==========================================
// ISTORIJA PORUDŽBINA
// ==========================================

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