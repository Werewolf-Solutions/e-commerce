const mongoose = require('mongoose')

const ProductsListSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    quantity: Number
})

const ProductsList = mongoose.model('ProductsList', ProductsListSchema)

module.exports = ProductsList