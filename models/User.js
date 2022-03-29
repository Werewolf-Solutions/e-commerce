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
    admin: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User