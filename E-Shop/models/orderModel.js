const mongoose = require('mongoose');
const order = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    company: {
        type:String
    },
    description: {
        type:String
    },
    country: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    phone: {
        type:Number,
        required: true
    },
    psc: {
        type:Number,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true, 
    },
    products: [{
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }],
});

module .exports = mongoose.model("Order", order);