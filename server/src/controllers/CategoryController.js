const {Category} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  async index (req, res) {
    try {
      let categories = null
      const search = req.query.search
      console.log(search)
      if (search) {
        categories = await Category.findAll({
          where: {
            [Op.or]: [
              'name'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        categories = await Category.findAll({
          limit: 50
        })
      }
      console.log(categories)
      res.send(categories)
    } catch (err) {
      res.status(500).send({
        error: 'an error occured while trying to fetch contracts'
      })
    }
  },
  async get (req, res) {
    try {
      let categories = await Category.findAll({
        limit: 50
      })
      res.send(categories)
    } catch (err) {
      res.status(500).send({
        error: 'an error occured while trying to fetch categories'
      })
      // console.log(err)
    }
  }
}
