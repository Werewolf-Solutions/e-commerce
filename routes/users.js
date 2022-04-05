const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const fs = require('fs')

const imgPath = '/home/lorenzo/projects/e-commerce/files/admin-dashboard.png'

// Stripe
const { STRIPE_API_KEY } = process.env
const stripe = require('stripe')(STRIPE_API_KEY)

// Load User model
const User = require('../models/User')

// Load Order model
const Order = require('../models/Order')

// Load Product model
const Product = require('../models/Product')

var user_logged_in

/**
 * GET
 * 
 * /
 * 
 * get user logged in and update it
 */
router.get('/', async (req, res, next) => {
  console.log('here')
  let user = await User.findById(req.session.userId)
  let orders = []
  // console.log(typeof user)
  let b = {
    c: ''
  }
  let a = [{test: 'test'}]
  b.a = a
  b['c'] = a
  console.log(b)
  if (user && user.admin) {
    orders = await Order.find()
  } else if (user && !user.admin) {
    orders = await Order.find({orderedBy: req.session.userId})
  } else {
    user = null
  }
  // if (user) {
  //   orders = await Order.find({orderedBy: user._id})
  //   console.log(orders)
  //   user['orders'] = orders
  //   console.log(user)
  // }
  res.send({user, orders})
})

/* GET update Products List */
router.get('/update-products-list', async (req, res, next) => {
  let products = await Product.find()
  if (products) {
    res.send({products})
  } else {
    res.send({msg: 'Add product'})
  }
})

/**
 * GET
 * 
 * /products
 * 
 * retrieve products
 */
 router.get('/products', async (req, res, next) => {
  let products = await Product.find()
  res.send(products)
})

/**
 * POST
 * 
 * /send-msg
 * 
 * user-admin and admin-user messages
 */

router.post('/send-msg', async (req, res, next) => {
  let {message, order_id} = req.body
  let {userId} = req.session
  let user = await User.findById(userId)
  let order = await Order.findById(order_id)
  if (user) {
    order.messages.push({text: message, sentBy: user._id, username: user.username})
    await order.save()
    res.send(order)
  } else {
    res.send({msg: 'Please sign in'})
  }
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
 router.post('/sign-up', async (req, res) => {
  const {email, password, password2 } = req.body
  let errors = []

  if (!email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' })
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  if (password && password.length < 4) {
    errors.push({ msg: 'Password must be at least 4 characters' })
  }

  if (errors.length > 0) {
    res.send(errors)
  } else {
    // Validation passed
    let user = await User.findOne({ email: email })
    if (user) {
      errors.push({ msg: 'Email already exists' })
      res.send({ errors: errors })
    } else {
      let username = email.split('@', 1)[0]
      let newUser
      let address = {
        postcode: '',
        line1: '',
        line2: '',
        flat: 0,
        number: 0,
        city: '',
        county: '',
        region: '',
        country: ''
      }
      if (email === 'admin@gmail.com') {
        newUser = new User({
          email,
          password,
          admin: true,
          username,
          address
        })
      } else {
        const customer = await stripe.customers.create({
          description: username,
          email: email
        })
        newUser = new User({
          email,
          password,
          admin: false,
          username,
          customer_id: customer.id,
          address
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
  let user = await User.findById(userId)
  // TODO:
  //      - do better validation with password and 2Step auth
  let user_deleted = await User.findByIdAndDelete(userId)
  await stripe.customers.del(user.customer_id)
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
  const {
    username,
    firstName,
    lastName,
    address1,
    address2,
    country,
    region,
    postcode,
    city,
    number,
  } = req.body
  const { userId } = req.session
  let user = await User.findById(userId)
  if (user) {
    if (username) {
      user.username = username
    }
    if (firstName) {
      user.firstName = firstName
    }
    if (lastName) {
      user.lastName = lastName
    }
    if (address1) {
      user.address.line1 = address1
    }
    if (address2) {
      user.address.line2 = address2
    }
    if (number) {
      user.address.number = number
    }
    if (region) {
      user.address.region = region
    }
    if (country) {
      user.address.country = country
    }
    if (postcode) {
      user.address.postcode = postcode
    }
    if (city) {
      user.address.city = city
    }
    await user.save()
    res.send({ success: 'User edited correctly'})
  } else {
    res.send({ error: 'No user logged in'})
  }
})

router.post('/add-order', async (req, res, next) => {
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
router.post('/stripe-info', async (req, res, next) => {
  let {cart} = req.body
  const products = await stripe.products.list({
    limit: 3,
  })
  const prices = await stripe.prices.list({
    limit: 3,
  })
  const sessions = await stripe.checkout.sessions.list({
    limit: 3,
  })
  
  
  const paymentMethod = await stripe.paymentMethods.retrieve(
    'pm_1K43nwAlUKnrAXrlEHjFrPsu'
  )
  // const paymentMethods = await stripe.paymentMethods.list({
  //   customer: 'cus_3fB4ABQzA6QjVL',
  //   type: 'card',
  // })
  

  // const { userId } = req.session
  // let user = await User.findById(userId)
  // if (user) {
  //   let total_cart = 0
  //   cart.forEach(item => total_cart = total_cart + (item.quantity * item.price))
  //   console.log(total_cart)
  //   let order = {
  //     user_id: user._id,
  //     address: {postcode: 'B169JS'},
  //     items: cart,
  //     total_cart
  //   }
  //   // save order in admin
  //   let admin = await User.findOne({email: 'admin@gmail.com'})
  //   admin.orders.push(order)
  //   await admin.save()
  //   // save order in user using the same order_id
  //   for (let i = 0; i < admin.orders.length; i++) {
  //     if (admin.orders[i].user_id == user._id) {
  //       let order = {
  //         user_id: user._id,
  //         address: {postcode: 'B169JS'},
  //         items: cart,
  //         order_id: admin.orders[i]._id,
  //         total_cart
  //       }
  //       user.orders.push(order)
  //       await user.save()
  //     }
  //   }
  // }
  res.send({
    products: products.data,
    prices: prices.data,
    sessions: sessions.data,
    paymentMethod
  })
})

// to be deleted
router.post('/create-customer', async (req, res, next) => {
  const customer = await stripe.customers.create({
    description: 'My First Test Customer',
  })
  res.send(customer)
})

// to be deleted
router.post('/retrieve-customer', async (req, res, next) => {
  let {id} = req.body
  const customer = await stripe.customers.retrieve(id)
  res.send(customer)
})

// to be deleted
router.get('/list-customers', async (req, res, next) => {
  const customers = await stripe.customers.list({
    limit: 3,
  })
  res.send(customers.data)
})

router.post('/create-payment-intent', async (req, res, next) => {
  let {payment_method, total_cart, cart} = req.body
  const { userId } = req.session
  let user = await User.findById(userId)
  // check total_cart is correct
  let t_c = 0
  cart.forEach(item => t_c = t_c + item.price*item.quantity*100)
  console.log(t_c, total_cart)
  if (user && t_c === total_cart) {
    try {
      if (user.payment_methods.length === 0) {
        res.send({msg: 'Add a payment method first'})
      } else {
        // create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: total_cart,
          currency: 'gbp',
          payment_method: payment_method,
          customer: user.customer_id
        })
        // add payment intent to user's payment intents
        // TODO: add payment intent details in order and delete payment_intents array from User model
        // TODO: add address from user.address => don't need admin/user cause admin it's an user and will have an address?
        let card = await stripe.paymentMethods.retrieve(payment_method)
        user.payment_intents.push(paymentIntent)
        paymentIntent.card = card.card
        paymentIntent.card.id = card.id
        let order = new Order({
          orderedBy: user._id,
          address: user.address,
          items: cart,
          payment_intent: paymentIntent,
          total_amount: total_cart
        })
        await user.save()
        await order.save()
        res.send({user, paymentIntent: paymentIntent.id, order})
      }
    } catch (error) {
      console.log(error)
      res.send({msg: error.raw ? error.raw.message : error})
    }
  } else {
    res.send({msg: 'No user found, please sign in or sign up first'})
  }
})

router.post('/confirm-payment-intent', async (req, res, next) => {
  let {payment_intent} = req.body
  const { userId } = req.session
  let user = await User.findById(userId)
  let order = await Order.findOne({'payment_intent.id': payment_intent})
  if (user) {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(payment_intent)
      console.log(paymentIntent.charges.data[0].id)
      paymentIntent.charges.id = paymentIntent.charges.data[0].id
      // update user's payment intent
      for (let i = 0; i < user.payment_intents.length; i++) {
        if (user.payment_intents[i].id == paymentIntent.id) {
          user.payment_intents[i] = paymentIntent
        }
      }
      // update order payment intent status
      order.payment_intent = paymentIntent
      await user.save()
      await order.save()
      res.send({user, paymentIntent, order})
    } catch (error) {
      console.log(error)
      res.send({msg: error.raw ? error.raw.message : error})
    }
  } else {
    res.send({msg: 'No user found, please sign in or sign up first'})
  }
})

router.post('/cancel-payment-intent', async (req, res, next) =>  {
  let {payment_intent} = req.body
  const paymentIntent = await stripe.paymentIntents.cancel(payment_intent)
  res.send({paymentIntent})
})

router.post('/retrieve-payment-intent', async (req, res, enxt) => {
  let {id} = req.body
  const paymentIntent = await stripe.paymentIntents.retrieve(id)
  res.send(paymentIntent)
})

router.post('/update-payment-intent', async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.update(
    'pi_3K7M07AlUKnrAXrl0sEuLGEo',
    {payment_method: 'pm_1K5AEdAlUKnrAXrlK1cs7jFt'}
  )
  res.send(paymentIntent)
})

router.get('/list-payment-intents', async (req, res, next) => {
  const { userId } = req.session
  let user = await User.findById(userId)
  if (user) {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 10,
    })
    let paymentIntent
    paymentIntents.data.forEach(payment => {
      if (payment.customer === user.customer_id) {
        paymentIntent = payment
      }
    })
    res.send(paymentIntent)
  } else {
    res.send({msg: 'No user found, please sign in or sign up first'})
  }
})

/**
 * POST
 * 
 * /add-payment-method
 * 
 * add payment method to user
 */
router.post('/add-payment-method', async (req, res, next) => {
  let {type, card} = req.body
  const { userId } = req.session
  let user = await User.findById(userId)
  if (user) {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.customer_id,
      type: type,
    })
    try {
      const paymentMethod = await stripe.paymentMethods.create({
        type: type,
        card: card,
      })
      if (paymentMethods.data.length != 0) {
        paymentMethods.data.forEach(async (payment) => {
          if (payment.fingerprint == paymentMethod.fingerprint) {
            res.send({msg: 'Payment method already existing, please choose another one or select existing'})
          } else {
            user.payment_methods.push({
              id: paymentMethod.id,
              fingerprint: paymentMethod.card.fingerprint,
              last4: paymentMethod.card.last4,
              country: paymentMethod.card.country,
              exp_month: paymentMethod.card.exp_month,
              exp_year: paymentMethod.card.exp_year,
              brand: paymentMethod.card.brand,
              card_name: card.card_name
            }) 
            await user.save()
            res.send({user, paymentMethod: paymentMethod.id})
          }
        })
      } else {
        const paymentMethod = await stripe.paymentMethods.create({
          type: type,
          card: card,
        })
        await stripe.paymentMethods.attach(paymentMethod.id, {customer: user.customer_id})
        user.payment_methods.push({
          id: paymentMethod.id,
          fingerprint: paymentMethod.card.fingerprint,
          last4: paymentMethod.card.last4,
          country: paymentMethod.card.country,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year,
          brand: paymentMethod.card.brand,
          card_name: card.card_name
        })
        await user.save()
        res.send({user, paymentMethod: paymentMethod.id})
      }
    } catch (error) {
      res.send({msg: error.raw.message ? error.raw.message : error})
    }
  } else {
    res.send({msg: 'No user found, please sign in or sign up first'})
  }
})

router.post('/detach-payment-method', async (req, res, next) => {
  let {payment_method} = req.body
  const { userId } = req.session
  let user = await User.findById(userId)
  if (user) {
    try {
      const paymentMethod = await stripe.paymentMethods.detach(payment_method)
      for (let i = 0; i < user.payment_methods.length; i++) {
        if (user.payment_methods[i].id == payment_method) {
          user.payment_methods.splice(i, 1)
        }
      }
      await user.save()
      res.send({user, paymentMethod})
    } catch (error) {
      res.send({msg: error.raw.message ? error.raw.message : error})
    }
  } else {
    res.send({msg: 'No user found, please sign in or sign up first'})
  }
})

router.post('/list-payment-methods', async (req, res, next) => {
  let {type} = req.body
  const { userId } = req.session
  let user = await User.findById(userId)
  if (user) {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.customer_id,
      type: type,
    })
    res.send(paymentMethods.data)
  } else {
    res.send({msg: 'No user found, please sign in or sign up first'})
  }
})

/**
 * ADMIN
 */

/**
 * POST
 * 
 * /add-product
 * 
 * admin can add product
 */
router.post('/add-product', async (req, res, next) => {
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
})

/**
 * POST
 * 
 * /upload-img
 * 
 * admin can add img to product
 */
 router.post('/upload-img', async (req, res, next) => {
  let {product, img} = req.body
  let buffer = fs.readFileSync(imgPath)
  console.log(buffer)
  let new_product = await Product.findById(product._id)
  new_product.img.data = buffer
  new_product.img.contentType = 'image/png'
  // await new_product.save()
  res.send({new_product, buffer})
})

/**
 * POST
 * 
 * edit-product
 * 
 * admin can edit product
 */
router.post('/edit-product', async (req, res, next) => {
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
    res.send({msg: 'Item edited!', item})
  } else {
    res.send({msg: "Please sign in as admin or make an account or missing product"})
  }
})

/**
 * POST
 * 
 * /delete-product
 * 
 * admin can delete product
 */
router.post('/delete-product', async (req, res, next) => {
  let {product} = req.body
  const { userId } = req.session
  let user = await User.findById(userId)
  if (user && user.admin && product) {
    await Product.findByIdAndDelete(product._id)
    res.send({msg: 'Item deleted!'})
  } else {
    res.send({msg: 'Please sign in as admin or make an account or missing product'})
  }
})

/**
 * USERS' ORDERS
 */

/**
 * GET
 * 
 * /orders
 * 
 * retrieve all users' orders
 */
router.get('/orders', async (req, res, next) => {
  let {userId} = req.session
  let user = await User.findById(userId)
  let orders = []
  if (user && user.admin) {
    orders = await Order.find()
  } else if (user && !user.admin) {
    orders = await Order.find({orderedBy: userId})
  }
  res.send({orders})
})

/**
 * POST
 * 
 * delete-order
 * 
 * delete user's order & cancel payment intent
 */
router.post('/delete-order', async (req, res, next) => {
  let {order} = req.body
  let {userId} = req.session
  let user = await User.findById(userId)
  let order_deleted = await Order.findByIdAndDelete(order._id)
  if (order_deleted && user) {
    res.send({msg: 'Order deleted successfully.', order_deleted})
  } else {
    res.send({msg: 'Please sign in as admin or make an account or missing product'})
  }
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
})

/**
 * POST
 * 
 * decline-order
 * 
 * decline user's order & send back reason or modifications to order
 */
 router.post('/decline-order', async (req, res, next) => {
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
})

/**
 * POST
 * 
 * edit-order
 * 
 * user can edit order and sand notification to admin
 */
 router.post('/edit-order', async (req, res, next) => {
  let {order} = req.body
  let {userId} = req.session
  let user = await User.findById(userId)
  let admin = await User.findOne({email: 'admin@gmail.com'})
  let mod

  if (user) {
    if (user.admin) {
      console.log(`admin is changing the order. Username: ${user.username}`)
      mod = {
        username: user.username,
        text: order.modifications
      }
      console.log(`add to admin ${user.email}`)
      for (let i = 0; i < user.orders.length; i++) {
        if (user.orders[i]._id == order._id) {
          user.orders[i].accepted = false
          user.orders[i].modifications.push(mod)
        }
      }
      await user.save()
      console.log(`add to user ${order.user_id}`)
      let recepient = await User.findById(order.user_id)
      for (let i = 0; i < recepient.orders.length; i++) {
        if (recepient.orders[i].order_id == order._id) {
          recepient.orders[i].accepted = false
          recepient.orders[i].modifications.push(mod)
        }
      }
      await recepient.save()
    } else {
      console.log(`user is changing the order. Username: ${user.username}`)
      mod = {
        username: user.username,
        text: order.modifications
      } 
      console.log(`add to admin ${admin.email}`)
      for (let i = 0; i < admin.orders.length; i++) {
        if (admin.orders[i]._id == order.order_id) {
          admin.orders[i].accepted = false
          admin.orders[i].modifications.push(mod)
        }
      }
      await admin.save()
      console.log(`add to user ${user.email}`)
      for (let i = 0; i < user.orders.length; i++) {
        if (user.orders[i].order_id == order.order_id) {
          user.orders[i].accepted = false
          user.orders[i].modifications.push(mod)
        }
      }
      await user.save()
    }
    res.send({msg: 'Order modified.', mod})
  } else {
    res.send({msg: 'Please sign in as admin or make an account or missing product'})
  }

  // if (admin && admin.admin && user) {
  //   for (let i = 0; i < user.orders.length; i++) {
  //     if (user.orders[i].order_id == order.order_id) {
  //       user.orders[i].accepted = false
  //       console.log(`user._id != admin._id && !admin.admin, ${user._id != admin._id} && ${!admin.admin}`)
  //       if (user._id != admin._id && admin.admin) {
  //         console.log('add modification to user')
  //         mod = {
  //           username: user.username,
  //           text: order.modifications
  //         }
  //         user.orders[i].modifications.push(mod)
  //       }
  //     }
  //   }
  //   await user.save()
  //   for (let i = 0; i < admin.orders.length; i++) {
  //     if (admin.orders[i]._id == order.order_id) {
  //       admin.orders[i].accepted = false
  //       console.log(`user._id === admin._id && admin.admin, ${user._id === admin._id} && ${admin.admin}`)
  //       console.log('add modification to admin')
  //       admin.orders[i].modifications.push(mod)
  //       order_modified = admin.orders[i]
  //     }
  //   }
  //   await admin.save()
  //   res.send({msg: 'Order modified.', user})
  // } else {
  //   res.send({msg: 'Please sign in as admin or make an account or missing product'})
  // }
})

/**
 * POST
 * 
 * /start-delivery
 * 
 * admin can start delivery
 */

router.post('/start-delivery', async (req, res, next) => {
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
})

/**
 * POST
 * 
 * /end-delivery
 * 
 * user and delivery driver can end delivery
 */

router.post('/end-delivery', async (req, res, next) => {
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
})

module.exports = router