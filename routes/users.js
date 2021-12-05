const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// Load User model
const User = require('../models/User')

// Load ProductsList model
const ProductsList = require('../models/ProductsList')

var user_logged_in

/**
 * GET
 * 
 * /
 * 
 * get user logged in and update it
 */
router.get('/', async (req, res, next) => {
  console.log(req.session.userId)
  let user = await User.findOne({email : user_logged_in})
  res.send({user})
})

/* GET update Products List */
router.get('/update-products-list', async (req, res, next) => {
  let productsList = await ProductsList.find()
  res.send({productsList})
})

/**
 * POST
 * 
 * /sign-in
 * 
 * sign in user
 */
/**
 * TODO
 * 
 * - don't send back what's wrong (don't let a random person know if password or email are wrong)#
 * - instead ask for email and send registration link or login link
 * - if the email is in use send a message that someone just tried to log in with you email
 * - set 2 step auth
 * - save only hash and salt instead of password
 */
var errors = 4
router.post('/sign-in', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      errors--
      if (errors <= 0) {
        return res.send({
          msg: 'Account is locked. Enter your email to receive the instructions on how to unlock it.'
        })
      }
      return res.send({msg: `User or password are wrong. Errors left: ${errors}.`})
    }
    req.session.userId = user.id
    req.login(user, function(err) {
      if (err) { return next(err) }
      req.session.save()
      return res.send({msg: 'You are logged in', user: user})
    })
  })(req, res, next)
})

/**
 * POST
 * 
 * sign-up
 * 
 * sign up user
 */
 router.post('/sign-up', (req, res) => {
  const {email, password, password2 } = req.body
  let errors = []

  if (!email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' })
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  if (password.length < 4) {
    errors.push({ msg: 'Password must be at least 4 characters' })
  }

  if (errors.length > 0) {
    res.send(errors)
  } else {
    // Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' })
        console.log(errors)
        res.send({ errors: errors })
      } else {
        let username = email.split('@', 1)[0]
        let newUser
        if (email === 'admin@gmail.com') {
          newUser = new User({
            email,
            password,
            admin: true,
            username
          })
        } else {
          newUser = new User({
            email,
            password,
            admin: false,
            username
          })
        }

        // Hash password and save
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => {                
                res.send({ msg: 'User added!' })
              })
              .catch(err => res.send(err))
          })
        })
      }
    })
  }
})

/**
 * GET
 * 
 * sign-out
 * 
 * sign out user
 */
router.get('/sign-out', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error')
    }
    req.logout()
    const { SESS_NAME } = process.env
    res.clearCookie(SESS_NAME)    
    res.json('You are logged out')
  })
})

/**
 * GET
 * 
 * /delete-user
 * 
 * delete user
 */
router.get('/delete-user', async (req, res, next) => {
  const { userId } = req.session
  // TODO:
  //      - do better validation with password and 2Step auth
  let user_deleted = await User.findByIdAndDelete(userId)
  req.session.destroy(err => {
    if (err) {
      return res.send('Error', err)
    }
    req.logout()
    const { SESS_NAME } = process.env
    res.clearCookie(SESS_NAME)    
    res.send({ msg: 'User deleted', name: user_deleted.name, email: user_deleted.email })
  })
})

/**
 * POST
 * 
 * /edit-user
 * 
 * edit user
 */
router.post('/edit-user', async (req, res, next) => {
  const { username } = req.body
  const { userId } = req.session
  if (userId) {
    if (username) {
      let user = await User.findById(userId)
      user.username = username
      console.log(user)
      await user.save()
      res.send({ success: 'Username edited correctly'})
    } else {
      res.send({ error: 'Enter your username please'})
    }
  } else {
    res.send({ error: 'No user logged in'})
  }
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