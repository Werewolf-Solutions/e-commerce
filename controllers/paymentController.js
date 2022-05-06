// Load User model
const User = require('../models/User')

// Load Order model
const Order = require('../models/Order')

// TODO: add payment provider: stripe, paypal, ...
const createPaymentIntent = async (req, res, next) => {
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
}

const confirmPaymentIntent = async (req, res, next) => {
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
}

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
        res.send({msg: 'No user found, please sign in or sign up first'})
    }
}

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

module.exports = {
    createPaymentIntent,
    confirmPaymentIntent,
    addPaymentMethod,
    detachPaymentMethod
}