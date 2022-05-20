import axios from 'axios'

/**
 * 
 * @desc    get user orders
 * @route   POST /users/orders
 * @access  Public
 * @params  orderedBy
 * @returns orders, msg
 */
export async function getOrders() {
    let orderedBy = '1'
    let res = await axios.post('users/orders', {orderedBy})
    console.log(res.data)
}

/**
 * 
 * @desc    create order
 * @route   POST /users/create-order
 * @access  Public
 * @params  order
 * @returns order, msg
 */
export async function createOrder(order) {
    let res = await axios.post('users/create-order', {order})
    console.log(res.data)
}

/**
 * 
 * @desc    delete order
 * @route   POST /users/delete-order
 * @access  Private
 * @params  order
 * @returns order, msg
 */
export async function deleteOrder(order) {
    let res = await axios.post('users/delete-order', {order})
    console.log(res.data)
}

/**
 * 
 * @desc    accept order
 * @route   POST /users/accept-order
 * @access  Private
 * @params  order
 * @returns order, msg
 */
export async function acceptOrder(order) {
    let res = await axios.post('users/accept-order', {order})
    console.log(res.data)
}

/**
 * 
 * @desc    decline order
 * @route   POST /users/decline-order
 * @access  Private
 * @params  order
 * @returns order, msg
 */
export async function declineOrder(order) {
    let res = await axios.post('users/decline-order', {order})
    console.log(res.data)
}

/**
 * 
 * @desc    start delivery
 * @route   POST /users/start-delivery
 * @access  Private
 * @params  order
 * @returns order, msg
 */
export async function startDelivery(order) {
    let res = await axios.post('users/start-delivery', {order})
    console.log(res.data)
}

/**
 * 
 * @desc    end delivery
 * @route   POST /users/end-delivery
 * @access  Private
 * @params  order
 * @returns order, msg
 */
export async function endDelivery(order) {
    let res = await axios.post('users/end-delivery', {order})
    console.log(res.data)
}