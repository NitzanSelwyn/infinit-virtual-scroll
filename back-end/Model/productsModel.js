const mongoose = require('mongoose');


module.exports = mongoose.model('Product', {
    imageUrl:String,
    _id:Number,
    product:String,
    price:String,
    inStock:Boolean
});