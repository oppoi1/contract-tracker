require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const { sequelize } = require('./models')
const config = require('./config/config')

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 8081)
  console.log(`Magic happens on port ${config.port}`)
})
