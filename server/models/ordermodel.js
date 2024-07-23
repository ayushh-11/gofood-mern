const mongoose = require("mongoose");

orderSchema = new mongoose.Schema({
    title : String,
    email : {
        type : String,
        default : ()=>global.email
    },
    quantity : Number,
    price : Number,
    date : {
        type:Date,
        default:Date.now()
    },
    img : String
})

OrderModel = mongoose.model("orderSchema", orderSchema);

module.exports = OrderModel;