import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from '../config/config'
const db = {}

// Create DB connection
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    dialect: 'mysql'
  },
  config.db.option
)

// Read all models
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
