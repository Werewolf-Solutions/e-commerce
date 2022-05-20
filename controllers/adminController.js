// Load User model
const User = require('../models/User')

// Load Product model
const Product = require('../models/Product')

// Load Order model
const Order = require('../models/Order')

/**
 * 
 * @desc accept order
 * @route POST /users/accept-order
 * @access Private
 */
const acceptOrder = async (req, res, next) => {
    let {order} = req.body
    let {userId} = req.session
    let user = await User.findById(userId)
    let order_accepted = await Order.findById(order._id)
    if (user && user.admin) {
        order_accepted.accepted = true
        order_accepted.delivered = false
        order_accepted.status = 'preparing-order'
        await order_accepted.save()
        res.send({msg: 'Order accepted.', order_accepted})
    } else {
        res.send({msg: 'Please sign in as admin or make an account or missing product'})
    }
}

/**
 * 
 * @desc decline order
 * @route POST /users/decline-order
 * @access Private
 */
const declineOrder = async (req, res, next) => {
    let {order} = req.body
    let {userId} = req.session
    let user = await User.findById(userId)
    let order_declined = await Order.findById(order._id)
    if (user && user.admin) {
        order_declined.accepted = false
        order_declined.status = 'declined'
        if (order_declined.payment_intent
        && order_declined.payment_intent.status === 'succeeded'
        && order_declined.payment_intent.card) {
            console.log('Refund user payment')
            let refund = await stripe.refunds.create({
                charge: order_declined.payment_intent.charges.id,
            })
        } else {
            order_declined.accepted = false
            order_declined.delivered = false
            order_declined.status = 'declined'
        }
        await order_declined.save()
        res.send({msg: 'Order declined.', order_declined})
    } else {
        res.send({msg: 'Please sign in as admin or make an account or missing product'})
    }
}

/**
 * 
 * @desc start delivery
 * @route POST /users/start-delivery
 * @access Private
 */
const startDelivery = async (req, res, next) => {
    let {order} = req.body
    let {userId} = req.session
    let user = await User.findById(userId)
    let order_updated = await Order.findById(order._id)
    if (user && user.admin) {
        order_updated.status = 'delivering'
        order_updated.accepted = true
        await order_updated.save()
    }
    res.send(order_updated)
}

/**
 * 
 * @desc end delivery
 * @route POST /users/end-delivery
 * @access Private
 */
const endDelivery = async (req, res, next) => {
    let {order} = req.body
    let {userId} = req.session
    let user = await User.findById(userId)
    let order_updated = await Order.findById(order._id)
    if (user) {
        order_updated.status = 'delivered'
        order_updated.delivered = true
        order_updated.accepted = true
        await order_updated.save()
    }
    res.send(order_updated)
}

module.exports = {
    acceptOrder,
    declineOrder,
    startDelivery,
    endDelivery,
}