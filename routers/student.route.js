const studModel = require('../models/models/student.model')
const route = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

privateKey = process.env.PRIVATE_KEY
pk = 'taibaoui'
ck = '123';

verifytoken = (req, res, next) => {
    let token = req.headers.token
    if (!token) {
        res.status(400).json({ msg: 'access rejected.......!!!!!' })
    }

    try {
        let verify = jwt.verify(token, privateKey)
        next()
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

verifytokenadmin = (req, res, next) => {
    try {
        var token = req.headers.token
        var role = req.headers.role
        if (!token || role != 'Admin') {
            res.status(400).json({ msg: 'access rejected.......!!!!!' })
        }
        let verify = jwt.verify(token, privateKey)
        next()
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

verifyKey = (req, res, next) => {
    if (pk == req.query.pubkey && ck == req.query.clinkey) {
        next()
    } else {
        res.send('ecrit key not exist')
    }
}

route.get('/', (req, res, next) => {

    res.status(200).json({ msg: 'welcome taibaoui API' })
})

route.get('/students', verifytoken, (req, res, next) => {
    studModel.getAllStudent().then(stud => {
        res.status(200).json(stud)
    }).catch(err => {
        res.status(400).json(err)
    })
})

route.get('/students/:id', verifytoken, (req, res, next) => {
    studModel.getOneStudent(req.params.id).then(stud => {
        res.status(200).json(stud)
    }).catch(err => {
        res.status(400).json(err)
    })
})

route.post('/addstudent', verifytokenadmin, (req, res, next) => {
    studModel.postAddStudent({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        user_id: req.body.user_id
    }).then(msg => {
        res.status(200).json(msg)
    }).catch(err => {
        res.status(400).json(err)
    })
})

route.patch('/updatestudent/:id', verifytokenadmin, (req, res, next) => {
    studModel.patchUpdateStudent(req.params.id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone
    }).then(msg => {
        res.status(200).json(msg)
    }).catch(err => {
        res.status(400).json(err)
    })
})

route.delete('/deletestudent/:id', verifytokenadmin, (req, res, next) => {
    studModel.deleteOneStudent(req.params.id).then(stud => {
        res.status(200).json(stud)
    }).catch(err => {
        res.status(400).json(err)
    })
})


module.exports = route