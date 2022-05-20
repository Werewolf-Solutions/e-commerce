// Load User model
const User = require('../models/User')

// Load Order model
const Order = require('../models/Order')

// Stripe
const { STRIPE_API_KEY } = process.env
const stripe = require('stripe')(STRIPE_API_KEY)

let guest_number = 0
/**
 * 
 * @desc create payment intent
 * @route POST /users/create-payment-intent
 * @access Public
 */
// TODO: add payment provider: stripe, paypal, ...
const createPaymentIntent = async (req, res, next) => {
    let {
        payment_method,
        total_amount,
        cart,
        shipping_method,
        shipping_adddress,
        gateway
    } = req.body
    const { userId } = req.session
    let user = await User.findById(userId)
    // check total_cart is correct
    // NOTES: amount 1.00 = 100 for Stripe
    let t_c = 0
    cart.forEach(item => t_c = t_c + item.price*item.quantity*100)
    console.log(t_c, total_amount)
    if (user && t_c === total_amount) {
        try {
            if (user.payment_methods.length === 0) {
                res.send({msg: 'Add a payment method first'})
            } else {
                // create payment intent
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: total_amount,
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
                    total_amount: total_amount
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
        try {
            // guest
            /**
             * TODO:
             * 
             * create orderController to add / update / delete orders
             * 
             */
            let order
            guest_number++
            if (payment_method.card) {
                if (shipping_method.in_store) {
                    if (gateway.stripe) {
                        order = await stripePayInStore(payment_method, total_amount, cart)
                    }
                }
                if (shipping_method.delivery) {
                    if (gateway.stripe) {
                        order = await stripePayDelivery(payment_method, total_amount, shipping_adddress, cart)
                    }
                }
                res.send({
                    msg: 'Guest order succeded',
                    order
                })
            } else {
                res.send({msg: 'Missing card'})
            }
        } catch (error) {
            console.log(error)
            res.send({msg: error.raw ? error.raw.message : error})
        }        
    }
}

/**
 * 
 * @desc confirm payment intent
 * @route POST /users/confirm-payment-intent
 * @access Public
 */
const confirmPaymentIntent = async (req, res, next) => {
    let {payment_intent} = req.body
    const { userId } = req.session
    let user = await User.findById(userId)
    let order = await Order.findOne({'payment_intent.id': payment_intent})
    if (user) {
        try {
            let paymentIntent = await stripe.paymentIntents.confirm(payment_intent)
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
        // guest
        try {
            let paymentIntent = await stripe.paymentIntents.confirm(payment_intent)
            paymentIntent.charges.id = paymentIntent.charges.data[0].id
            let order = await Order.findOne({'payment_intent.id': payment_intent})
            // update order payment intent status
            order.payment_intent = paymentIntent
            await order.save()
            res.send({
                msg: 'Order completed.',
                paymentIntent,
                order
            })
        } catch (error) {
            res.send({msg: error.raw ? error.raw.message : error})
        }
    }
}


/**
 * 
 * @desc refund payment intent
 * @route POST /users/refund-payment-intent
 * @access Public
 */
const refundPaymentIntent = async (req, res, next) => {
    let {payment_intent} = req.body
    let {userId} = req.session
    let user = await User.findById(userId)
    let order_refunded = await Order.findOne({'payment_intent.id': payment_intent})
    if (user && user.admin) {
        if (order_refunded.payment_intent
        && order_refunded.payment_intent.status === 'succeeded'
        && order_refunded.payment_intent.charges) {
            console.log('Refund user payment')
            let refund = await stripe.refunds.create({
                charge: order_refunded.payment_intent.charges.id,
            })
            order_refunded.accepted = false
            order_refunded.status = 'refunded'
        } else {
            order_refunded.accepted = false
            order_refunded.delivered = false
            order_refunded.status = 'refunded'
        }
        await order_refunded.save()
        res.send({msg: 'Order refunded.', order_refunded})
    } else {
        res.send({msg: 'Please sign in as admin or make an account or missing product'})
    }
}

/**
 * 
 * @desc add payment method
 * @route POST /users/add-payment-method
 * @access Public
 */
const addPaymentMethod = async (req, res, next) => {
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
        // guest
        const paymentMethods = await stripe.paymentMethods.list({
            type: type,
        })
        const paymentMethod = await stripe.paymentMethods.retrieve(
            'pm_1KxRnmAlUKnrAXrlt15k8PN0'
        )
        // const paymentMethod = await stripe.paymentMethods.create({
        //     type: type,
        //     card: card,
        // })
        //
        res.send({
            msg: 'No user found, please sign in or sign up first',
            paymentMethod,
            paymentMethods
        })
    }
}


/**
 * 
 * @desc detach payment method
 * @route POST /users/detach-payment-method
 * @access Public
 */
const detachPaymentMethod = async (req, res, next) => {
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
}

const stripePayInStore = async (payment_method, total_amount, cart) => {
    let paymentMethod
    let paymentIntent
    let order
    // create payment method
    paymentMethod = await stripe.paymentMethods.create({
        type: payment_method.type,
        card: payment_method.card,
    })

    // create payment intent
    paymentIntent = await stripe.paymentIntents.create({
        amount: total_amount,
        currency: 'gbp',
        payment_method: paymentMethod.id
    })

    // save new order
    order = new Order({
        orderedBy: `guest${payment_method.table_number
            ? payment_method.table_number
            : guest_number}`,
        items: cart,
        payment_intent: paymentIntent,
        total_amount: total_amount
    })
    await order.save()
    return {order, paymentIntent, paymentMethod}
}

const stripePayDelivery = async (payment_method, total_amount, shipping_adddress, cart) => {
    let paymentMethod
    let paymentIntent
    let order
    // create payment method
    paymentMethod = await stripe.paymentMethods.create({
        type: payment_method.type,
        card: payment_method.card,
    })

    // create payment intent
    paymentIntent = await stripe.paymentIntents.create({
        amount: total_amount,
        currency: 'gbp',
        payment_method: paymentMethod.id
    })

    // save new order
    order = new Order({
        orderedBy: `guest${guest_number}`,
        address: shipping_adddress,
        items: cart,
        payment_intent: paymentIntent,
        total_amount: total_amount
    })
    await order.save()
    return {order, paymentIntent, paymentMethod}
}

module.exports = {
    createPaymentIntent,
    confirmPaymentIntent,
    addPaymentMethod,
    detachPaymentMethod,
    refundPaymentIntent
}