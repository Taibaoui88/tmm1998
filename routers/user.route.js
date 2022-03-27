const userModel = require('../models/models/user.model')
const route = require('express').Router()

route.post('/signup', (req, res, next) => {
    userModel.signup({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        res.status(200).json({ user: user, msg: 'user is save' })
    }).catch(err => {
        res.status(400).json({ error: err })
    }) 
})

route.post('/login', (req, res, next) => {
    userModel.login({
        email: req.body.email,
        password: req.body.password
    }).then(token => {
        res.status(200).json(token)
    }).catch(err => {
        res.status(400).json({ error: err })
    })
})

module.exports = route