const db = require('../')
require('dotenv').config()
const joi = require('joi')

const schemaValidaiter = joi.object({
    firstname: joi.string().alphanum().min(3).required(),
    lastname: joi.string().alphanum().min(3).required(),
    age: joi.number().integer().required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: joi.string().required()
})

exports.getAllStudent = () => {
    return new Promise((resolve, reject) => {
        db.student.findAll().then(stud => {
            resolve(stud)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.getOneStudent = (id) => {
    return new Promise((resolve, reject) => {
        // connect with database
        db.student.findOne({ _id: id }).then(stud => {
            resolve(stud)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.postAddStudent = (data) => {
    return new Promise((resolve, reject) => {
        let user
        let validation = schemaValidaiter.validate({
            firstname: data.firstname,
            lastname: data.lastname,
            age: data.age,
            email: data.email,
            phone: data.phone
        })
        if (validation.error) {
            reject(validation.error.details[0].message)
        }
        let stud = {
            firstname: data.firstname,
            lastname: data.lastname,
            age: data.age,
            email: data.email,
            phone: data.phone,
            user_id: data.user_id
        }
        db.student.create(stud).then(doc => {
            resolve(doc)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.patchUpdateStudent = (id, data) => {
    return new Promise((resolve, reject) => {
        return db.student.update({
            firstname: data.firstname,
            lastname: data.lastname,
            age: data.age,
            email: data.email,
            phone: data.phone
        }, { where: { _id: id } }).then(() => {
            resolve('this student is updated !')
        }).catch(err => {
            reject(err)
        })

    }).catch(err => {
        reject(err)
    })
}

exports.deleteOneStudent = (id) => {
    return new Promise((resolve, reject) => {
        db.student.destroy({ where: { _id: id } }).then(stud => {
            resolve('this student is deleted !')
        }).catch(err => {
            reject(err)
        })
    }).catch(err => {
        reject(err)
    })
}
