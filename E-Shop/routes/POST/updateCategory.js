const updateCategory = require('express').Router();
const modelCategory = require('../../models/categoryModel');

updateCategory.put("/update-category/:categoryId", (req, res) => {
    const categoryId = req.params.categoryId;
    const { name, description, category} = req.body;
    console.log(name + description);
  
    modelCategory.findByIdAndUpdate(categoryId, {
        name:name,
        description:description,
        category:category
    }, { new: true })
        .then(updatedCategory => {
            if (!updatedCategory) {
                return res.status(404).json({ msg: "Kategorie nebyla nalezena." });
            }
            return res.json({ msg: `Kategorie ${updatedCategory.name} byla aktulizována`, updatedCategory });
        })
        .catch(err => {
            console.error("Chyba pĹ™i aktualizaci produktu:", err);
            return res.status(500).json({ msg: "Nastala chyba pĹ™i aktualizaci produktu." });
        });
});

module.exports = updateCategory;