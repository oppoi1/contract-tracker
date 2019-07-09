/* eslint-disable no-unused-vars */
// Import all dependencies
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv/config'
import routes from './routes'
import { createConnection } from 'typeorm'
import 'reflect-metadata'
const app = express()

// Environment setup
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

// Import routes
routes(app)

// Start server
createConnection().then(async connection => {
  app.listen(process.env.PORT || 8087)
  console.log(`Magic happens on port ${process.env.port}`)
}).catch(error => console.log(error))
