const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async () => {

    try{
        mongoose.set('strict', false);
        const conn = await mongoose.connect(process.env.URL);
        console.log(`Databaze bezi­ na ${conn.connection.host}`);
    } catch{
        console.log("Databaze nefunguje");
    }

}

module.exports = connectDB;
