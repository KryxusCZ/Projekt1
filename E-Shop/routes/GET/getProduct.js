const getProductByID = require('express').Router();
const modelProduct = require('../../models/productModel');

getProductByID.get("/get-product/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await modelProduct.find({ _id: productId }).populate('category');
        return res.json({
            msg: "Nepodařilo se získat produkty",
            documents: product
        });
    } catch (err) {
        console.error("Chyba při získávání produktu:", err);
        return res.status(500).json({
            msg: "Nedošlo k získání produktu",
            documents: []
        });
    }
});

module.exports = getProductByID;