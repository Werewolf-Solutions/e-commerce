const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Load User model
const User = require('../models/User')

// Load ProductsList model
const ProductsList = require('../models/ProductsList')
const { findById, findOne } = require('../models/User')

var user_logged_in

/**
 * GET
 * 
 * /
 * 
 * get user logged in and update it
 */
router.get('/', async (req, res, next) => {
  let user = await User.findOne({email : user_logged_in})
  res.send({user})
})

/* GET update Products List */
router.get('/update-products-list', async (req, res, next) => {
  let productsList = await ProductsList.find()
  res.send({productsList})
})

/* POST log in user */
router.post('/sign-in', async (req, res, next) => {
  let { email, password } = req.body
  let user = await User.findOne({email : email})
  user_logged_in = email
  res.send({user})
})

/**
 * POST
 * 
 * sign-up
 * 
 * user signs up
 */
router.post('/sign-up', async (req, res, next) => {
  let { email, password, password2 } = req.body
  let user = await User.findOne({email : email})
  let new_user
  if (user) {
    res.send({msg: 'User already exists, try to sign in instead.'})
  } else if (email === 'admin@gmail.com') {
    new_user = new User({email, password, admin: true, username: 'admin'})
    await new_user.save()
  } else {
    let username = email.split('@', 1)[0]
    new_user = new User({email, password, admin: false, username})
    await new_user.save()
  }
  res.send({user:new_user})
})

/**
 * GET
 * 
 * sign-out
 * 
 * user signs out
 */
router.get('/sign-out', (req, res, next) => {
  res.send({user:null})
})

/**
 * USERS
 */


/**
 * POST
 * 
 * add-item-to-cart
 * 
 * user adds item to cart
 */
router.post('/add-item-to-cart', (req, res, next) => {
  let {item} = req.body
  let items = []
  items.push(item)
  console.log(items)
  res.send({items})
})

/**
 * POST
 * 
 * edit-item-quantity-in-cart
 * 
 * user adds or deletes quantity of item selected in cart
 */
router.post('/edit-item-quantity-in-cart', (req, res, next) => {
  let { item } = req.body
  items.forEach(obj => {
    if (obj.name === item.name) {
      obj.quantity = item.quantity
    }
  })
  res.send({items})
})

/**
 * POST
 * 
 * delete-item-from-cart
 * 
 * user deletes item from cart
 */
router.post('/delete-item-from-cart', (req, res, next) => {
  let {item} = req.body
  console.log(item)
  res.send({msg: 'Item deleted!'})
})

/**
 * POST
 * 
 * checkout
 * 
 * user checkout
 */
router.post('/checkout', async (req, res, next) => {
  let {cart} = req.body
  let user = await User.findOne({email: user_logged_in})
  if (user) {
    let order = {
      user_id: user._id,
      address: {postcode: 'B169JS'},
      items: cart
    }
    // save order in admin
    let admin = await User.findOne({email: 'admin@gmail.com'})
    admin.orders.push(order)
    await admin.save()
    // save order in user using the same order_id
    for (let i = 0; i < admin.orders.length; i++) {
      if (admin.orders[i].user_id == user._id) {
        let order = {
          user_id: user._id,
          address: {postcode: 'B169JS'},
          items: cart,
          order_id: admin.orders[i]._id
        }
        console.log(order)
        user.orders.push(order)
        await user.save()
      }
    }
  } else {
    // sign-in/up and send order to admin
  }
  res.send({msg: 'Order placed. Waiting for admin response'})
})

/**
 * ADMIN
 */

/* POST add item to products list */
router.post('/add-item-to-products-list', async (req, res, next) => {
  let {product} = req.body
  let {name, price, description, category} = product
  let user = await User.findOne({email: user_logged_in})
  if (user.admin) {
    let new_item = new ProductsList({name, price, description, category, quantity: 0})
    await new_item.save()
  }
  res.send({msg: 'New item added!'})
})

/* POST edit item in products list */
/**
 * POST
 * 
 * edit-item-in-products-list
 * 
 * edit item in products list
 */
router.post('/edit-item-in-products-list', async (req, res, next) => {
  let {product} = req.body
  let {_id, name, price, description, category} = product
  let item = await ProductsList.findById({_id: _id})
  console.log(item)
  let user = await User.findOne({email: user_logged_in})
  if (user.admin) {
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
  }
  res.send({msg: 'Item edited!'})
})

/* POST delete item from products list */
router.post('/delete-item-from-products-list', async (req, res, next) => {
  let {product} = req.body
  await ProductsList.findByIdAndDelete({_id:product._id})
  res.send({msg: 'Item deleted!'})
})

/**
 * USERS' ORDERS
 */

/**
 * POST
 * 
 * delete-order
 * 
 * delete user's order
 */
router.post('/delete-order', async (req, res, next) => {
  let {order} = req.body
  let user = await User.findById({_id: order.user_id})
  let admin = await User.findOne({email: 'admin@gmail.com'})
  for (let i = 0; i < admin.orders.length; i++) {
    if (admin.orders[i]._id.toString() == order._id) {
      admin.orders.splice(i, 1)
      await admin.save()
    }
  }
  for (let i = 0; i < user.orders.length; i++) {
    if (user.orders[i].order_id.toString() == order._id) {
      user.orders.splice(i, 1)
      await user.save()
    }
  }
  res.send({msg: 'Order deleted successfully.'})
})

/**
 * POST
 * 
 * accept-order
 * 
 * accept user's order
 */
router.post('/accept-order', async (req, res, next) => {
  let {order} = req.body
  let user = await User.findById(order.user_id)
  let admin = await User.findOne({email: 'admin@gmail.com'})
  for (let i = 0; i < user.orders.length; i++) {
    if (user.orders[i].order_id == order._id) {
      user.orders[i].accepted = true
    }
  }
  await user.save()
  for (let i = 0; i < admin.orders.length; i++) {
    if (admin.orders[i]._id == order._id) {
      admin.orders[i].accepted = true
    }
  }
  await admin.save()
  res.send({msg: 'Order accepted.'})
})

/**
 * POST
 * 
 * decline-order
 * 
 * decline user's order
 */
 router.post('/decline-order', async (req, res, next) => {
  let {order} = req.body
  let user = await User.findById(order.user_id)
  let admin = await User.findOne({email: 'admin@gmail.com'})
  for (let i = 0; i < user.orders.length; i++) {
    if (user.orders[i].order_id == order._id) {
      user.orders[i].accepted = false
    }
  }
  await user.save()
  for (let i = 0; i < admin.orders.length; i++) {
    if (admin.orders[i]._id == order._id) {
      admin.orders[i].accepted = false
    }
  }
  await admin.save()
  res.send({msg: 'Order declined.'})
})

module.exports = router