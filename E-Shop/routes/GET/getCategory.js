const getCategory = require('express').Router();
const modelCategory = require('../../models/categoryModel');

getCategory.get("/get-category/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await modelCategory.find({ _id: categoryId });
        return res.json({
            msg: "Nepodařilo se získat produkty",
            documents: category
        });
    } catch (err) {
        console.error("Chyba při získávání produktu:", err);
        return res.status(500).json({
            msg: "Nedošlo k získání produktu",
            documents: []
        });
    }
});

module.exports = getCategory;