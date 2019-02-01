require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const path = require('path')
const { sequelize } = require('./models')
const config = require('./config/config')
const Partner = sequelize.import(path.join(__dirname, './models/Partner'))
const Company = sequelize.import(path.join(__dirname, './models/Company'))
const Contract = sequelize.import(path.join(__dirname, './models/Contract'))
const Category = sequelize.import(path.join(__dirname, './models/Category'))

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

// Company.Partner = Company.hasMany(Partner)
// eslint-disable-next-line no-unused-vars
Partner.Company = Partner.belongsTo(Company)
Partner.Contract = Partner.hasMany(Contract)
Category.Contract = Category.hasMany(Contract)
Company.Contract = Company.hasMany(Contract)

require('./routes')(app)

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 8081)
  console.log(`Magic happens on port ${config.port}`)
})
