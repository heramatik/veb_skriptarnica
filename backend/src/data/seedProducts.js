import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../models/productModel.js";
import products from "./products.js";

dotenv.config();

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("Proizvodi su uspešno ubačeni u bazu!");

        process.exit();
    } catch (error) {
        console.error(`Greška: ${error.message}`);
        process.exit(1);
    }
};

importData();
