const mongoose = require('mongoose')

const AddressSchema = require('./Address')
const PaymentMethodSchema = require('./PaymentMethod')
const PaymentIntentSchema = require('./PaymentIntent')

const OrderSchema = new mongoose.Schema({
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    shipping_method: String,
    delivery_time: Date,
    total_amount: Number,
    status: String,
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
        text: String,
        sentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order