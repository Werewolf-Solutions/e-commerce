const mongoose = require('mongoose')

const PaymentMethodSchema = require('./PaymentMethod')

const PaymentIntentSchema = new mongoose.Schema({
    id: String,
    status: String, //change to enum?
    payment_method: String,
    charges: {
        id: String
    },
    card: PaymentMethodSchema
})

module.exports = PaymentIntentSchema