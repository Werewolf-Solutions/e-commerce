const mongoose = require('mongoose')

const AddressSchema = require('./Address')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    customer_id: String,
    firstName: String,
    lastName: String,
    payment_methods: [{
        id: String,
        fingerprint: String,
        last4: Number,
        country: String,
        exp_month: Number,
        exp_year: Number,
        brand: String
    }],
    payment_intents: [{
        id: String,
    }],
    address: AddressSchema,
    cart: [],
    orders: [{
        user_id: String,
        order_id: String,
        delivery_time: Date,
        payment_intent: {
            id: String,
            status: String, //change to enum?
            payment_method: String
        },
        total_amount: Number,
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