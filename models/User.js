const mongoose = require('mongoose')

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
    address: {
        postcode: String,
        line1: String,
        line2: String,
        flat: Number,
        number: Number,
        city: String,
        county: String,
        region: String,
        country: String
    },
    cart: [],
    orders: [{
        user_id: String,
        order_id: String,
        payment_intent: {
            id: String,
            status: String, //change to enum?
            payment_method: String
        },
        total_amount: Number,
        address: {
            postcode: String,
            line1: String,
            line2: String,
            flat: Number,
            number: Number,
            city: String,
            county: String,
            region: String,
            country: String
        },
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