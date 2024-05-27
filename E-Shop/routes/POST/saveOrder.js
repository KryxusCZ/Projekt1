const saveOrder = require('express').Router();
const modelOrder = require('../../models/orderModel');


saveOrder.post("/save-order", async(req, res) => {
    try {
        const { name, lastName, company, address, country, email, phone, psc, description, products, price  } = req.body;

        for (let product of products) {
            if (!product.productId || !product.quantity || product.quantity < 1) {
                return res.status(400).send('Each product must have a productId and a quantity of at least 1.');
            }
        }

        const order = new modelOrder({
            firstName: name, 
            lastName:lastName, 
            company:company, 
            address:address, 
            country:country, 
            psc:psc, 
            email:email, 
            phone:phone,  
            description: description, 
            products:products, 
            price:price 
        });

        await order.save();

        return res.json({
            msg: `Došlo k uložení objednávky`,
        });
    } catch (error) {
        console.error('Error saving order:', error);

        return res.status(500).json({
            msg: "Bohužel nedošlo k uložení objednávky"
        });
    }
});

module.exports = saveOrder;