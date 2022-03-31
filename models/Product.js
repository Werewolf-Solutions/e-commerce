const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    quantity: Number,
    img: {
        data: Buffer,
        contentType: String
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product