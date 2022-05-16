const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    quantity: Number,
    img: {
        path: String,
        filename: String,
        mimetype: String
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product