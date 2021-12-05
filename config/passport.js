// Check if user is signed in
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Load User model
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        
            // Match user
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    console.log('there is no email registered')
                    return done(null, false, { message: 'That email is not registered' })
                }
                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        console.log('password is correct')
                        return done(null, user)
                    } else {
                        console.log('password incorrect')
                        return done(null, false, { message: 'Password incorrect' })
                    }
                })
            })
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
}