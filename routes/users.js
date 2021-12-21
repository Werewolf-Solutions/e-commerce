const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// Stripe
const { STRIPE_API_KEY } = process.env
const stripe = require('stripe')(STRIPE_API_KEY)

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
  let user = await User.findById(req.session.userId)
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
 router.post('/sign-up', async (req, res) => {
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
    number
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
  let {payment_method, total_cart} = req.body
  const { userId } = req.session
  let user = await User.findById(userId)
  if (user) {
    try {
      if (user.payment_methods.length === 0) {
        res.send({msg: 'Add a payment method first'})
      } else {
        // let order = {
        //   user_id: userId,
        //   address: {postcode: 'B169JS'},
        //   items: cart,
        //   total_cart
        // }
        // // save order in admin
        // let admin = await User.findOne({email: 'admin@gmail.com'})
        // admin.orders.push(order)
        // await admin.save()
        // // save order in user using the same order_id
        // for (let i = 0; i < admin.orders.length; i++) {
        //   if (admin.orders[i].user_id == userId) {
        //     let order = {
        //       user_id: userId,
        //       address: {postcode: 'B169JS'},
        //       items: cart,
        //       order_id: admin.orders[i]._id,
        //       total_cart
        //     }
        //     user.orders.push(order)
        //     await user.save()
        //   }
        // }
        const paymentIntent = await stripe.paymentIntents.create({
          amount: total_cart,
          currency: 'gbp',
          payment_method: payment_method,
          customer: user.customer_id
        })
        user.payment_intents.push({id: paymentIntent.id})
        await user.save()
        res.send({user, paymentIntent: paymentIntent.id})
      }
    } catch (error) {
      console.log(error)
      res.send({msg: error.raw.message})
    }
  } else {
    res.send({msg: 'No user found, please sign in or sign up first'})
  }
})

router.post('/confirm-payment-intent', async (req, res, next) => {
  let {payment_intent} = req.body
  const { userId } = req.session
  let user = await User.findById(userId)
  if (user) {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(payment_intent)
      res.send(paymentIntent)
    } catch (error) {
      res.send({msg: error.raw.message})
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
          if (payment.fingerprint === paymentMethod.fingerprint) {
            res.send({msg: 'Payment method already existing, please choose another one or select existing'})
          } else {
            user.payment_methods.push({
              id: paymentMethod.id,
              fingerprint: paymentMethod.fingerprint,
              last4: paymentMethod.last4,
              country: paymentMethod.country,
              exp_month: paymentMethod.exp_month,
              exp_year: paymentMethod.exp_year,
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
          last4: paymentMethod.last4,
          country: paymentMethod.country,
          exp_month: paymentMethod.exp_month,
          exp_year: paymentMethod.exp_year,
        })
        await user.save()
        res.send({user, paymentMethod: paymentMethod.id})
      }
    } catch (error) {
      res.send({msg: error.raw.message})
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

router.post('/create-checkout-session', async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1JP2GJAlUKnrAXrlqWC4Qhdb',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:5000/users/success`,
    cancel_url: `http://localhost:5000/users/cancel`,
  })
  res.send(session.data)
})

router.get('/list-checkout-sessions', async (req, res, next) => {
  const sessions = await stripe.checkout.sessions.list({
    limit: 10,
  })
  res.send(sessions.data)
})

router.post('/retrieve-checkout-session', async (req, res, next) => {
  const session = await stripe.checkout.sessions.retrieve(
    'cs_test_a1HRYjbEG8Iied3ffT17qsPkIbEm6Q4cvrwUMTWIVY3vyR8ZYUqH0Rybh9'
  )
  res.send(session)
})

router.get('/success', (req, res, next) => {
  console.log('success')
  res.send({msg:'Success'})
})

router.get('/cancel', (req, res, next) => {
  console.log('cancel')
  res.send({msg:'Cancel'})
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