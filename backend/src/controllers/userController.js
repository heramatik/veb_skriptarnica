import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Registracija korisnika
const registerUser = async (req, res) => {
    // IZMENJENO: Prihvatamo phone i address iz req.body
    const { name, email, password, phone, address, savedCards } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            message: 'Korisnik već postoji',
        });
    }

    // IZMENJENO: Upisujemo phone i address u bazu prilikom kreiranja
    const user = await User.create({
        name,
        email,
        password,
        phone,
        address,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,       // DODATO
            address: user.address,   // DODATO
            isAdmin: user.isAdmin,
            isWaiter: user.isWaiter,
            isManager: user.isManager,
            isLoyalCustomer: user.isLoyalCustomer,
            savedCards: user.savedCards,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({
            message: 'Neispravni podaci',
        });
    }
};

// Login korisnika
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isAdmin: user.isAdmin,
            isManager: user.isManager,
            isWaiter: user.isWaiter,
            isLoyalCustomer: user.isLoyalCustomer,
            savedCards: user.savedCards,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({
            message: 'Pogrešan email ili lozinka',
        });
    }
};

// Odjava korisnika
const logoutUser = async (req, res) => {
    res.status(200).json({
        message: 'Odjava uspešna',
    });
};
// @desc    Add card
// @route   POST /api/users/add-card
// @access  Private

// Dodavanje kartice korisniku
const addCard = async (req, res) => {
    const { cardHolder, cardNumber, expiryDate } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
        user.savedCards.push({
            cardHolder,
            cardNumber,
            expiryDate,
        });

        await user.save();

        res.status(201).json({
            message: 'Kartica uspešno dodata',
            savedCards: user.savedCards,
        });
    } else {
        res.status(404).json({
            message: 'Korisnik nije pronađen',
        });
    }
};

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// @desc    Update user roles and info
// @route   PUT /api/users/:id/roles
// @access  Private/Admin
const updateUserRoles = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        // Zadržano postojeće + dodata mogućnost čuvanja izmena za telefon/adresu ako zatreba
        user.isAdmin = req.body.isAdmin ?? user.isAdmin;
        user.isWaiter = req.body.isWaiter ?? user.isWaiter;
        user.isManager = req.body.isManager ?? user.isManager;
        user.isLoyalCustomer = req.body.isLoyalCustomer ?? user.isLoyalCustomer;
        user.phone = req.body.phone ?? user.phone;
        user.address = req.body.address ?? user.address;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,       // DODATO
            address: updatedUser.address,   // DODATO
            isAdmin: updatedUser.isAdmin,
            isWaiter: updatedUser.isWaiter,
            isManager: updatedUser.isManager,
            isLoyalCustomer: updatedUser.isLoyalCustomer,
        });
    } else {
        res.status(404).json({ message: 'Korisnik nije pronađen' });
    }
};

export {
    registerUser,
    authUser,
    logoutUser,
    getUsers,
    updateUserRoles,
    addCard
};