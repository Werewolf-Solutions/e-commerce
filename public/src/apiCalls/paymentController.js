const axios = require('axios')

/**
 * 
 * @desc    create payment intent
 * @route   POST /users/create-payment-intent
 * @access  Public
 * @params  amount, currency, payment_method.id, user.customer_id
 * @returns user, paymentIntent, order, msg
 */
// TODO: handle guest or user
export async function createPaymentIntent() {
    let payment_intent = {
        amount: 10,
        currency: 'gbp',
        payment_method: 'payment_method.id',
        customer: 'user.customer_id', // optional
        cart: ['items']
    }
    let res = await axios.post('users/create-payment-intent', payment_intent)
    console.log(res.data)
}

/**
 * 
 * @desc    confirm payment intent
 * @route   POST /users/confirm-payment-intent
 * @access  Public
 * @params  payment_intent
 * @returns user, paymentIntent, order, msg
 */
export async function confirmPaymentIntent() {
    let payment_intent = {
        _id: '1',
        amount: 10,
        currency: 'gbp',
        payment_method: 'payment_method.id',
        customer: 'user.customer_id', // optional
        cart: ['items']
    }
    let res = await axios.post('users/confirm-payment-intent', {payment_intent})
    console.log(res.data)
}

/**
 * 
 * @desc    refund payment intent
 * @route   POST /users/refund-payment-intent
 * @access  Private
 * @params  payment_intent
 * @returns order_refunded, refund, msg
 */
export async function refundPaymentIntent(payment_intent) {
    let res = await axios.post('users/refund-payment-intent', {payment_intent})
    console.log(res.data)
}

/**
 * 
 * @desc    create payment method
 * @route   POST /users/create-payment-method
 * @access  Public
 * @params  type, card
 * @returns user, paymentMethod, msg
 */
 export async function createPaymentMethod() {
    let payment_method = {
        type: 'card',
        card: {details: 'card'}
    }
    let res = await axios.post('users/create-payment-method', {payment_method})
    console.log(res.data)
}

/**
 * 
 * @desc    detach payment method
 * @route   POST /users/detach-payment-method
 * @access  Public
 * @params  payment_method
 * @returns user, paymentMethod, msg
 */
 export async function detachPaymentMethod() {
    let payment_method = {
        id: '1',
        type: 'card',
        card: {details: 'card'}
    }
    let res = await axios.post('users/detach-payment-method', {payment_method})
    console.log(res.data)
}