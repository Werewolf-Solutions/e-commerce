const mongoose = require('mongoose')

const AddressSchema = require('./Address')
const PaymentMethodSchema = require('./PaymentMethod')
const PaymentIntentSchema = require('./PaymentIntent')
const OrderSchema = require('./Order')

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
    orders: [OrderSchema],
    admin: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User