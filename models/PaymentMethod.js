const mongoose = require('mongoose')

const PaymentMethodSchema = new mongoose.Schema({
    id: String,
    fingerprint: String,
    last4: Number,
    country: String,
    exp_month: Number,
    exp_year: Number,
    brand: String,
    card_name: String
})

module.exports = PaymentMethodSchema