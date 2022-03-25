const mongoose = require('mongoose')

const AddressSchema = require('./Address')
const PaymentMethodSchema = require('./PaymentMethod')
const PaymentIntentSchema = require('./PaymentIntent')
const UserSchema = require('./User')

const OrderSchema = new mongoose.Schema({
    user: UserSchema,
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
    messages: [{
        username: String,
        text: String
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = OrderSchema