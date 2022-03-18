const mongoose = require('mongoose')

const AddressSchema = require('./Address')
const PaymentMethodSchema = require('./PaymentMethod')
const PaymentIntentSchema = require('./PaymentIntent')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    customer_id: String,
    firstName: String,
    lastName: String,
    payment_methods: [PaymentMethodSchema],
    payment_intents: [PaymentIntentSchema],
    address: AddressSchema,
    cart: [],
    orders: [{
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
    }],
    admin: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User