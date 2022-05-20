const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const fs = require('fs')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, "./public/src/uploads/")
    callback(null, "uploads/")
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// Import user controller
const {
  getUser,
  signIn,
  signUp,
  signOut,
  deleteUser,
  updateUser,
  sendMsg,
} = require('../controllers/userController')

// Imnport product controller
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  uploadImg
} = require('../controllers/productController')

// Import payment controller
const {
  createPaymentIntent,
  confirmPaymentIntent,
  createPaymentMethod,
  detachPaymentMethod,
  refundPaymentIntent
} = require('../controllers/paymentController')

const {
  createOrder,
  deleteOrder,
  acceptOrder,
  declineOrder,
  startDelivery,
  endDelivery,
  getOrders
} = require('../controllers/orderController')

const imgPath = '/home/lorenzo/projects/e-commerce/public/src/files/pizza-margherita.jpeg'

// Stripe
const { STRIPE_API_KEY } = process.env
const stripe = require('stripe')(STRIPE_API_KEY)

// Load User model
const User = require('../models/User')

// Load Order model
const Order = require('../models/Order')

// Load Product model
const Product = require('../models/Product')

// TODO: what to do with this?
// invoked for any requests passed to this router
router.use(function (req, res, next) {
  console.log('Checking connection with users/')
  next()
})

/**
 * USER endpoints
 */

/**
 * NOTES:
 * 
 * gets user from req.session
 * 
 * sends user, orders
 * 
 * REVIEW:
 * 
 * handle orders in a better way
 */
router.get('/', getUser)

/**
 * NOTES:
 * 
 * saves message in DB
 * 
 * REVIEW:
 * 
 * don't save anymore in orders but in chats and encypt everything
 */
router.post('/send-msg', sendMsg)

router.post('/sign-in', signIn)

router.post('/sign-up', signUp)

router.get('/sign-out', signOut)

router.get('/delete-user', deleteUser)

router.post('/update-user', updateUser)

router.post('/create-order', createOrder)

router.post('/delete-order', deleteOrder)

/**
 * PAYMENT endpoints
 */

/**
 * Public
 */
router.post('/create-payment-intent', createPaymentIntent)

/**
 * Public
 */
router.post('/confirm-payment-intent', confirmPaymentIntent)

/**
 * Public
 */
router.post('/create-payment-method', createPaymentMethod)

/**
 * Public
 */
router.post('/detach-payment-method', detachPaymentMethod)

/**
 * Private only admin
 */
router.post('/refund-payment-intent', refundPaymentIntent)

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
 * PRODUCT endpoints
 */

router.get('/products', getProducts)

router.post('/create-product', createProduct)

router.post('/update-product', updateProduct)

router.post('/delete-product', deleteProduct)

router.post('/upload-img', upload.single('file'), uploadImg)


/**
 * ORDER endpoints
 */

router.post('/orders', getOrders)

router.post('/accept-order', acceptOrder)

router.post('/decline-order', declineOrder)

router.post('/start-delivery', startDelivery)

router.post('/end-delivery', endDelivery)

module.exports = router