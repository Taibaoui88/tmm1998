const db = require('../')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var privateKey = 'dfdskjfhkshsfuiqwe5456dadddsadlkj'

exports.signup = (data) => {
    return new Promise((resolve, reject) => {
        db.user.findOne({ where: { email: data.email } }).then((user) => {
            if (user) {
                reject('this user is exist !')
            } else {
                bcrypt.hash(data.password, 10).then(hpass => {
                    let User = {
                        username: data.username,
                        email: data.email,
                        password: hpass
                    }
                    return db.user.create(User)
                }).then(doc => {
                    resolve(doc)
                }).catch(err => {
                    reject(err)
                })
            }
        }).catch(err => {
            reject(err)
        })
    })
}

exports.login = (data) => {
    return new Promise((resolve, reject) => {
        return db.user.findOne({ email: data.email }).then(user => {
            if (!user) {
                reject('email and password not courect!')
            } else {
                bcrypt.compare(data.password, user.password).then(doc => {
                    if (!doc) {
                        reject('email and password not courect!')
                    } else {
                        let token = jwt.sign({
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            role: 'Admin'
                        }, privateKey, { expiresIn: '1h' })
                        resolve({ token: token })
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        }).catch(err => {
            reject(err)
        })
    })
}

