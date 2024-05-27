const express = require('express');
const deleteProduct = express.Router();
const modelCategory = require('../../models/categoryModel');

deleteProduct.delete("/delete-category/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const deletedCategory = await modelCategory.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ msg: "Dodavatel nebyl nalezen." });
        }
    
        return res.json({ msg: `Kategorie ${deletedCategory.name} byla smazána `});
    } catch (err) {
     
        console.error("Chyba při mazání kategorie:", err);
        return res.status(500).json({ msg: "Nastala chyba při mazání kategorie." });
    }
});

module.exports = deleteProduct;