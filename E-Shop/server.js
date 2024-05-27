const express = require("express");
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./Database/connect");
connectDB();


const saveAdmin = require('./routes/POST/saveAdmin');
const activateAdmin = require('./routes/GET/activateAdmin');
const login = require('./routes/POST/login');
const checkLogin = require('./routes/GET/checkLogin');
const saveProduct = require('./routes/POST/saveProduct');
const updateProduct = require('./routes/POST/updateProduct');
const getProducts = require('./routes/GET/getProducts');
const getProduct = require('./routes/GET/getProduct');
const deleteProduct = require('./routes/POST/deleteProduct');
const saveCategory = require('./routes/POST/saveCategory');
const getCategories = require('./routes/GET/getCategories');
const updateCategory = require('./routes/POST/updateCategory');
const getCategory = require('./routes/GET/getCategory');
const deleteCategory = require('./routes/POST/deleteCategory');
const saveOrder = require('./routes/POST/saveOrder');
const getOrders = require('./routes/GET/getOrders');

app.get("/", (request,response) => {
    response.send("Jsi na hlavní stránce. vítej tedy");
});

app.listen(PORT, (err) => {
    console.log( `Server běží na  ${PORT}!`);
})
app.use(express.json({extended:false}));


/*
* GET
*/

app.use("/",cors(), activateAdmin);
app.use("/",cors(), checkLogin);
app.use("/",cors(), getProducts);
app.use("/",cors(), getProduct);
app.use("/",cors(), getCategories);
app.use("/",cors(), getCategory);
app.use("/",cors(), getOrders);

/*
* POST
*/
app.use("/",cors(), saveAdmin);
app.use("/",cors(), login);
app.use("/",cors(), saveProduct);
app.use("/",cors(), updateProduct);
app.use("/",cors(), deleteProduct);
app.use("/",cors(), saveCategory);
app.use("/",cors(), updateCategory);
app.use("/",cors(), deleteCategory);
app.use("/",cors(), saveOrder);