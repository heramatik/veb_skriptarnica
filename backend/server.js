import cors from "cors";
import express from "express";
import nodesRoutes from "./src/routes/nodesRoutes.js";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import orderRoutes from "./src/routes/orderRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

// Middleware
app.use(express.json());

// Logovanje zahteva
app.use((req, res, next) => {
    console.log(
        `Zahtev primljen: ${req.method} ${req.url}`
    );
    next();
});

// Rute
app.use("/heramatik/zapis", nodesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Pokretanje servera
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});