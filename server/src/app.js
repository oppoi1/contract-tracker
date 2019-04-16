// Import all dependencies
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv/config'
import routes from './routes'
const app = express()
const { sequelize } = require('./models')
const Partner = sequelize.import(path.join(__dirname, './models/Partner'))
const Company = sequelize.import(path.join(__dirname, './models/Company'))
const Contract = sequelize.import(path.join(__dirname, './models/Contract'))
const Category = sequelize.import(path.join(__dirname, './models/Category'))

// Environment setup
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

// Associations
Partner.Company = Partner.belongsTo(Company)
Partner.Contract = Partner.hasMany(Contract)
Category.Contract = Category.hasMany(Contract)
Company.Contract = Company.hasMany(Contract)

// Import routes
routes(app)

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 8087)
  console.log(`Magic happens on port ${process.env.port}`)
})
