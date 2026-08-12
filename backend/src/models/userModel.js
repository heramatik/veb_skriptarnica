import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
        isManager: { type: Boolean, required: true, default: false },
        isWaiter: { type: Boolean, required: true, default: false },
        isLoyalCustomer: { type: Boolean, required: true, default: false },

        savedCards: [
            {
                cardHolder: { type: String, required: true },
                last4: { type: String, required: true },        // bilo: cardNumber (pun broj) — IZBAČENO
                expiryDate: { type: String, required: true },
                brand: {
                    type: String,
                    enum: ['Visa', 'MasterCard', 'Dina', 'American Express'],
                    required: true,
                },
                paymentMethodId: { type: String },              // opciono: token (mock sad, procesor kasnije)
                isDefault: { type: Boolean, default: false },
            },
        ],
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;