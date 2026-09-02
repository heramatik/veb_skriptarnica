import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// GET SVI PROIZVODI
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
});

// GET JEDAN PROIZVOD
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Proizvod nije pronađen");
    }
});

// CREATE NOVI PROIZVOD
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        image,
        countInStock,
    } = req.body;

    const product = await Product.create({
        name,
        description,
        price,
        category,
        image,
        countInStock,
        isAvailable: countInStock > 0,
    });

    res.status(201).json(product);
});

// UPDATE PROIZVOD
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Proizvod nije pronađen");
    }

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category ?? product.category;
    product.image = req.body.image ?? product.image;
    product.countInStock =
        req.body.countInStock ?? product.countInStock;

    // Ako admin ručno pošalje isAvailable, koristi tu vrednost.
    // Ako menja količinu, automatski određujemo dostupnost.
    if (req.body.isAvailable !== undefined) {
        product.isAvailable = req.body.isAvailable;
    } else if (req.body.countInStock !== undefined) {
        product.isAvailable = req.body.countInStock > 0;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
});

// DELETE PROIZVOD
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Proizvod nije pronađen");
    }

    await product.deleteOne();

    res.json({
        message: "Proizvod je uspešno obrisan",
    });
});

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
