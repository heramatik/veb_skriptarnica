import cors from "cors";
import express from "express"; //da bi koristili import moramo u package.json da promenimo type mode u module
import nodesRoutes from "./src/routes/nodesRoutes.js";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./src/middleware/rateLimiter.js";

import userRoutes from './src/routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
}));
const PORT = process.env.PORT || 5001

//middleware
app.use(express.json()); //da bi mogli da korisutimo req.body i da prevedemo serveru json.
//app.use(rateLimiter);

app.use((req, res, next) => {
    console.log(`Zahtev primljen ${req.method} & URL zahteva je &{req.url}`);
    next();
});

app.use("/heramatik/zapis", nodesRoutes);
app.use("/api/users", userRoutes);

connectDB().then(() => {
    app.listen(PORT, () =>{
     console.log(`Server is running on port ${PORT}`);
    });
});
