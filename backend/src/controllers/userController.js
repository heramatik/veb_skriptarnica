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
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    try {
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
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Greška na serveru",
        });
    }
};

// Odjava korisnika
const logoutUser = async (req, res) => {
    res.status(200).json({
        message: 'Odjava uspešna',
    });
};

// @desc    Dodaj karticu korisniku
// @route   POST /api/users/cards
// @access  Private
const addCard = async (req, res) => {
    const { cardHolder, brand, last4, expiryDate, paymentMethodId } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    if (!cardHolder || !brand || !last4 || !expiryDate) {
        return res.status(400).json({ message: 'Nedostaju podaci o kartici' });
    }

    const isFirst = user.savedCards.length === 0;

    user.savedCards.push({
        cardHolder,
        brand,
        last4,
        expiryDate,
        paymentMethodId,
        isDefault: isFirst, // prva kartica = podrazumevana
    });

    await user.save();

    res.status(201).json({
        message: 'Kartica uspešno dodata',
        savedCards: user.savedCards,
    });
};

// @desc    Vrati sve kartice korisnika
// @route   GET /api/users/cards
// @access  Private
const getCards = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    res.json(user.savedCards);
};

// @desc    Obriši karticu po ID-u
// @route   DELETE /api/users/cards/:id
// @access  Private
const deleteCard = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    const card = user.savedCards.id(req.params.id);

    if (!card) {
        return res.status(404).json({ message: 'Kartica nije pronađena' });
    }

    const wasDefault = card.isDefault;
    user.savedCards = user.savedCards.filter(
        (c) => c._id.toString() !== req.params.id
    );

    // ako je obrisana podrazumevana, prva preostala postaje podrazumevana
    if (wasDefault && user.savedCards.length > 0) {
        user.savedCards[0].isDefault = true;
    }

    await user.save();

    res.json(user.savedCards);
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
    addCard,
    getCards,
    deleteCard,
};