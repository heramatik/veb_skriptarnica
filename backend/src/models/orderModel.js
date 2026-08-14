import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },

        orderItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                price: { type: Number, required: true },
                image: { type: String },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
            },
        ],

        shippingAddress: {
            name: { type: String },
            phone: { type: String },
            tableNumber: { type: String },
            note: { type: String },
        },

        paymentMethod: {
            type: String,
            required: true,
            enum: ['Gotovina', 'Kartica'],
        },

        selectedCard: {
            type: String,
            default: null,
        },

        itemsPrice: {
            type: Number,
            required: true,
        },

        discountPercentage: {
            type: Number,
            default: 0,
        },

        discountAmount: {
            type: Number,
            default: 0,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        paidAt: {
            type: Date,
        },

        isDelivered: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;