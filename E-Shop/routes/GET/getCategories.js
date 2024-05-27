const getCategories = require('express').Router();
const categoryModel = require('../../models/categoryModel');

getCategories.get("/get-categories", async (req, res) => {
categoryModel.find({})
.then(docs => {
    return res.json({
        msg: "Úspěšně se nám podařilo získat produkty",
        documents: docs
    });
})
.catch(err => {
    return res.json({
        msg: "Bohužel nedošlo k získání produktů",
        documents: []
    });
});
});

module.exports = getCategories;