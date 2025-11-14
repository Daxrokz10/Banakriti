const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    tags:{
        type: [String],
        required: true,
    },
    sku:{
        type: String,
        unique: true
    },
    dimensions:{
        length: Number,
        width: Number,
        height: Number
    },
    color:{
        type: String
    },
    shippingTime:{
        type: Number
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;