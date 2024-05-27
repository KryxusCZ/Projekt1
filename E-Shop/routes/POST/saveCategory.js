const saveCategory = require('express').Router();
const modelCategory = require('../../models/categoryModel');

saveCategory.post("/save-category", (req, res) => {
    const { name, description} = req.body;
    console.log(name + description);
    const category = new modelCategory({
        name:name,
        description:description
    });

    category.save()
        .then(document => {
            return res.json({
                msg: `Došlo k uložení produktu ${JSON.stringify(document.name)}`
            });
        })
        .catch(err => {
            return res.json({
                msg: "Bohužel nedošlo k kategorie"
            });
        });
});

module.exports = saveCategory;