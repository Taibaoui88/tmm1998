const express = require('express')
const db = require('./models')
const cors = require('cors')
const routeUser = require('./routers/user.route')
const routeStudent = require('./routers/student.route')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/admin', routeUser)
app.use('/', routeStudent)

db.sequelize.sync({ alert: true }).then(() => {
    port = process.env.PORT || 3000
    app.listen(port, () => console.log(`the server is running in port :${port}`))
}).catch(err => console.log(err))