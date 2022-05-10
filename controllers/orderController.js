// Load Order model
const Order = require('../models/Order')


/**
 * 
 * @desc add order
 * @route POST /users/add-order
 * @access Public
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
            res.send(orders)
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
 * @desc delete order
 * @route POST /users/delete-order
 * @access Public
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

let timeout
const startCountdown = () => {
    console.log('starting timeout')
    timeout = setTimeout(() => {
        console.log('Timeout ended')
    }, 2000)
}


module.exports = {
    createOrder,
    deleteOrder
}