const mongoose = require('mongoose')

const PaymentIntentSchema = new mongoose.Schema({
    id: String,
    status: String, //change to enum?
    payment_method: String
})

module.exports = PaymentIntentSchema