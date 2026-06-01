import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // OVO JE DODATO:
        phone: {
            type: String,
            required: true, // Može biti false ako želiš da bude opciono, ali pošto je na formi 'required', stavi true
        },
        address: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        isManager: {
            type: Boolean,
            required: true,
            default: false,
        },
        isWaiter: {
            type: Boolean,
            required: true,
            default: false,
        },
        isLoyalCustomer: {
            type: Boolean,
            required: true,
            default: false,
        },
        // DODAJEMO OVO:
        savedCards: [
            {
                cardHolder: String,
                cardNumber: String,
                expiryDate: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Poređenje lozinke prilikom login-a
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};

// Hešovanje lozinke pre čuvanja
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(
        this.password,
        salt
    );
});


const User = mongoose.model('User', userSchema);

export default User;