import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; 

// Middleware za proveru da li je korisnik ulogovan (ima validan token)
const protect = async (req, res, next) => {
    let token;

    // Proveravamo da li token stiže kroz Authorization Header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Token izgleda kao: "Bearer eYjKdfg..." -> uzimamo samo drugi deo
            token = req.headers.authorization.split(' ')[1];

            // Dekodiramo token pomoću tajnog ključa koji je u .env fajlu
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Nalazimo korisnika u bazi preko ID-ja iz tokena i "kačimo" ga na req objekt (bez lozinke)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Puštamo zahtev dalje ka kontroleru
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Niste autorizovani, token je nevažeći' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Niste autorizovani, token nedostaje' });
    }
};

// Middleware za proveru da li je korisnik administrator
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Korisnik je admin, pusti ga dalje
    } else {
        res.status(413).json({ message: 'Pristup odbijen. Samo za administratore!' });
    }
};

export { protect, admin };