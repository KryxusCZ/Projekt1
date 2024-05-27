const saveProduct = require('express').Router();
const modelProduct = require('../../models/productModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images') // Určete cestu, kam se mají uložit nahrávané soubory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Nastavte název souboru
    }
});
const upload = multer({ storage: storage });



saveProduct.post("/save-product", upload.single('image'), (req, res) => {
    const { name, code, description, price, units, category} = req.body;
    const image_url = req.file.path;
    const product = new modelProduct({
        name:name,
        code:code,
        price:price,
        description:description,
        url:image_url,
        units:units,
        category:category
    });

    product.save()
        .then(document => {
            return res.json({
                msg: `Došlo k uložení produktu ${JSON.stringify(document.name)}`,
                product_id:document._id
            });
        })
        .catch(err => {
            return res.json({
                msg: "Bohužel nedošlo k uložení produktu"
            });
        });
});

module.exports = saveProduct;