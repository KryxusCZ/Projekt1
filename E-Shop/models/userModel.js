const mongoose = require('mongoose');
const user = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    name: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    isActive: {
        type:Boolean,
        default: false
    },
    code: {
        type:Number        
    }
});

module .exports = mongoose.model("User", user);