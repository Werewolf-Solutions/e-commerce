const axios = require('axios')

/**
 * 
 * @desc    get user logged in 
 * @route   GET /users/
 * @access  Private
 * @params  -
 * @returns user
 */
export async function getUser() {
    let res = await axios.get('users/')
    console.log(res.data)
}

/**
 * 
 * @desc    sign in user
 * @route   POST /users/sign-in
 * @access  Private
 * @params  email, password
 * @returns user, msg
 */
export async function signIn(email, password) {
    let res = await axios.post('users/sign-in', {email, password})
    console.log(res.data)
}

/**
 * 
 * @desc    sign up user
 * @route   POST /users/sign-up
 * @access  Private
 * @params  email, password, password2
 * @returns user, msg
 */
export async function signUp(email, password, password2) {
    let res = await axios.post('users/sign-up', {email, password, password2})
    console.log(res.data)
}


/**
 * 
 * @desc    sign out user
 * @route   GET /users/sign-out
 * @access  Private
 * @params  -
 * @returns msg
 */
export async function signOut(email, password) {
    let res = await axios.get('users/sign-out')
    console.log(res.data)
}

/**
 * 
 * @desc    delete user
 * @route   GET /users/delete-user
 * @access  Private
 * @params  -
 * @returns msg
 */
export async function deleteUser(email, password) {
    let res = await axios.get('users/delete-user')
    console.log(res.data)
}

/**
 * 
 * @desc    update user
 * @route   POST /users/update-user
 * @access  Private
 * @params  user
 * @returns user, msg
 */
export async function updateUser(user) {
    let res = await axios.post('users/update-user', {user})
    console.log(res.data)
}
