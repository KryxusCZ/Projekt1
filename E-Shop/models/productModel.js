const mongoose = require('mongoose');
const product = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required:true
    },
    code: {
        type:Number,
        required:true        
    },

    units: {
        type:Number,
        required:true        
    },

    url:{
        type:String 
    },

    isVisible:{
        type:Boolean,
        default: false
    },

    category:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    }
    
});

module .exports = mongoose.model("Product", product);