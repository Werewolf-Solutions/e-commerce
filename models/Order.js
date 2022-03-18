const mongoose = require('mongoose')

const AddressSchema = require('./Address')
const PaymentMethodSchema = require('./PaymentMethod')
const PaymentIntentSchema = require('./PaymentIntent')

const OrderSchema = new mongoose.Schema({
    user_id: String,
    order_id: String,
    delivery_time: Date,
    total_amount: Number,
    payment_intent: PaymentIntentSchema,
    address: AddressSchema,
    items: [],
    accepted: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    delivered: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    modifications: [{
        username: String,
        text: String
    }]
})

module.exports = OrderSchema