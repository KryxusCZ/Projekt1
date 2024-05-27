const getOrders = require('express').Router();
const orderModel = require('../../models/orderModel');

getOrders.get("/get-orders", async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('products.productId');
        res.json({
            msg: "Úspěšně se nám podařilo získat Objednávky",
            documents: orders
        });
    } catch (err) {
        res.json({
            msg: "Bohužel nedošlo k získání objednávek",
            documents: []
        });
    }
});

module.exports = getOrders;