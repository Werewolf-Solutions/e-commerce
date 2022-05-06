// Load User model
const User = require('../models/User')

// Load Product model
const Product = require('../models/Product')

// Load Order model
const Order = require('../models/Order')

/**
 * 
 * @desc add product
 * @route POST /users/add-product
 * @access Public
 */
const addProduct = async (req, res, next) => {
    let {product} = req.body
    let {name, price, description, category} = product
    const { userId } = req.session
    let user = await User.findById(userId)
    if (user && user.admin) {
        let new_product = new Product({name, price, description, category, quantity: 0})
        await new_product.save()
        res.send({msg: 'New product added!', user})
    } else {
        res.send({msg: 'Please sign in as admin or make an account'})
    }
}

const updateProduct = async (req, res, next) => {
    let {product} = req.body
    let {_id, name, price, description, category} = product
    let item = await Product.findById({_id: _id})
    console.log(item)
    const { userId } = req.session
    let user = await User.findById(userId)
    if (user && user.admin) {
        if (name && name != item.name) {
            item.name = name
        }
        if (description && description != item.description) {
            item.description = description
        }
        if (price && price != item.price) {
            item.price = price
        }
        if (category && category != item.category) {
            item.category = category
        }
        await item.save()
        res.send({msg: 'Item updated!', item})
    } else {
        res.send({msg: "Please sign in as admin or make an account or missing product"})
    }
}

const deleteProduct = async (req, res, next) => {
    let {product} = req.body
    const { userId } = req.session
    let user = await User.findById(userId)
    if (user && user.admin && product) {
        await Product.findByIdAndDelete(product._id)
        res.send({msg: 'Item deleted!'})
    } else {
        res.send({msg: 'Please sign in as admin or make an account or missing product'})
    }
}

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

const getProducts = async (req, res, next) => {
    let products = await Product.find()
    console.log(products)
    if (products) {
        res.send({products})
    } else {
        res.send({msg: 'Add product'})
    }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    acceptOrder,
    declineOrder,
    startDelivery,
    endDelivery,
    getProducts
}