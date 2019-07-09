const {Category} = require('../models')

module.exports = {
  async get (req, res) {
    try {
      const categories = await Category.findAll({
        limit: 50
      })
      res.send(categories)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured while trying to fetch categories.'
      })
    }
  },
  async post (req, res) {
    try {
      const categories = await Category.create(req.body)
      res.send(categories)
    } catch (err) {
      res.status(500).send({
        error: 'Error while creating Category.'
      })
    }
  }
}
