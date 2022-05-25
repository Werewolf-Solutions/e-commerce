// Load Order model
const Order = require('../models/Order')

// Load User model
const User = require('../models/User')

// TODO: change it like below
const order = {
    all: () => {
        let orders = []
        return orders
    },
    create: () =>  {
        let order = {}
        return order
    }
}
// module.exports = order

/**
 * 
 * @desc    get user orders
 * @route   GET /users/orders
 * @access  Public
 * @params  -
 * @returns orders
 */
const getOrders = async (req, res, next) => {
    let {orderedBy} = req.body
    const { userId } = req.session
    let user = await User.findById(userId)
    let orders
    if (user.admin) {
        // if admin get all orders
        orders = await Order.find()
        // console.log(orders)
        res.send({orders})
    } else if (orderedBy) {
        // else get user's orders
        orders = await Order.find({'orderedBy': orderedBy})
        console.log(orders)
        res.send({orders})
    }
}

/**
 * 
 * @desc    create order
 * @route   POST /users/create-order
 * @access  Private
 * @params  order
 * @returns order, msg
 */
const createOrder = async (req, res, next) => {
    let {order} = req.body
    const { userId } = req.session
    let user = await User.findById(userId)
    // check total_cart is correct
    let t_c = 0
    order.items.forEach(item => t_c = t_c + item.price*item.quantity)
    console.log(t_c, order.total_cart)
    if (user && t_c === order.total_cart) {
        try {
            order.orderedBy = user._id
            order.total_amount = order.total_cart*100
            order.payment_intent = {
                status: 'succeeded',
                payment_method: 'cash'
            }
            let new_order = new Order(order)
            startCountdown()
            await new_order.save()
            let orders = await Order.find({orderedBy: user._id})
            res.send({order: new_order})
        } catch (error) {
            console.log(error)
            res.send({msg: error.raw ? error.raw.message : error})
        }
    } else {
        res.send({msg: 'No user found, please sign in or sign up first'})
    }
}

/**
 * 
 * @desc    delete order
 * @route   POST /users/delete-order
 * @access  Private
 * @params  order
 * @returns order, msg
 */
// TODO: start countdown of order when it's created (add key to model)
const deleteOrder = async (req, res, next) => {
    let {order} = req.body
    let {userId} = req.session
    let user = await User.findById(userId)
    let order_ = await Order.findById(order._id)
    console.log(order_.countdown)
    if (order_.countdown > 0 && user) {
        console.log('order in time to be cancelled')
        let order_deleted = await Order.findByIdAndDelete(order._id)
        res.send({msg: 'Order deleted successfully.', order_deleted})
    } else {
        console.log('too late to cancel order')
        res.send({msg: 'Please sign in as admin or make an account or missing product'})
    }
}

/**
 * 
 * @desc    accept order
 * @route   POST /users/accept-order
 * @access  Private
 * @params  order
 * @returns order, msg
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
 * @desc    decline order
 * @route   POST /users/decline-order
 * @access  Private
 * @params  order
 * @returns order, msg
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
 * @desc    start delivery
 * @route   POST /users/start-delivery
 * @access  Private
 * @params  order
 * @returns order, msg
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
 * @desc    end delivery
 * @route   POST /users/end-delivery
 * @access  Private
 * @params  order
 * @returns order, msg
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

let timeout
const startCountdown = () => {
    console.log('starting timeout')
    timeout = setTimeout(() => {
        console.log('Timeout ended')
    }, 2000)
}


module.exports = {
    createOrder,
    deleteOrder,
    startDelivery,
    endDelivery,
    acceptOrder,
    declineOrder,
    getOrders
}