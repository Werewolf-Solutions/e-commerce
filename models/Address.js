const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    postcode: String,
    line1: String,
    line2: String,
    flat: Number,
    number: Number,
    city: String,
    county: String,
    region: String,
    country: String
})

module.exports = AddressSchema