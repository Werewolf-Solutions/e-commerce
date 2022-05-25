const passport = require('passport')
const bcrypt = require('bcryptjs')

// Stripe
const { STRIPE_API_KEY } = process.env
const stripe = require('stripe')(STRIPE_API_KEY)

// Load User model
const User = require('../models/User')

// Load Order model
const Order = require('../models/Order')

/**
 * 
 * @desc get user logged in 
 * @route GET /users/
 * @access Public
 */
const getUser = async (req, res, next) => {
    let user = await User.findById(req.session.userId)
    let orders = []
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
}

/**
 * TODO:
 * 
 * - don't send back what's wrong (don't let a random person know if password or email are wrong)#
 * - instead ask for email and send registration link or login link
 * - if the email is in use send a message that someone just tried to log in with you email
 * - set 2 step auth
 * - save only hash and salt instead of password
 */
/**
 * 
 * @desc sign in user
 * @route POST /users/sign-in
 * @access Public
 */
var errors = 4
const signIn = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
            errors--
            if (errors <= 0) {
                return res.status(400).send({
                    msg: 'Account is locked. Enter your email to receive the instructions on how to unlock it.'
                })
            }
            return res.status(400).send({msg: `User or password are wrong. Errors left: ${errors}.`})
        }
        req.session.userId = user.id
        req.login(user, function(err) {
            if (err) { return next(err) }
            req.session.save()
            return res.send({msg: 'You are logged in', user: user})
        })
    })(req, res, next)
}

/**
 * 
 * @desc sign up user
 * @route POST /users/sign-up
 * @access Public
 */
const signUp = async (req, res) => {
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
}

/**
 * 
 * @desc sign out user
 * @route GET /users/sign-out
 * @access Public
 */
const signOut = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
        return res.send('Error')
        }
        req.logout()
        const { SESS_NAME } = process.env
        res.clearCookie(SESS_NAME)    
        res.json('You are signed out')
    })
}


/**
 * 
 * @desc delete user
 * @route GET /users/delete-user
 * @access Public
 */
const deleteUser = async (req, res, next) => {
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
}

/**
 * 
 * @desc update user
 * @route POST /users/update-user
 * @access Public
 */
// TODO: change it to findByIdAndUpdate(id, user)
const updateUser = async (req, res, next) => {
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
}


/**
 * 
 * @desc send message
 * @route POST /users/send-msg
 * @access Public
 */
const sendMsg = async (req, res, next) => {
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
}

module.exports = {
    getUser,
    signIn,
    signUp,
    signOut,
    deleteUser,
    updateUser,
    sendMsg
}