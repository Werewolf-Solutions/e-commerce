const mongoose = require('mongoose')

const AddressSchema = require('./Address')
const PaymentMethodSchema = require('./PaymentMethod')
const PaymentIntentSchema = require('./PaymentIntent')

const OrderSchema = new mongoose.Schema({
    orderedBy: {
        id: String,
        name: String,
        mobile: String,
        email: String
    },
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    shipping_method: String,
    number: Number,
    delivery_time: Date,
    total_amount: Number,
    status: String,
    payment_intent: PaymentIntentSchema,
    payment_method: PaymentMethodSchema,
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
    ready: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    completed: {
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