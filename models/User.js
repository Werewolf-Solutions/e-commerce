const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
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
        }
    }],
    admin: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User