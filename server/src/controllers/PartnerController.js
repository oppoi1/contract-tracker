const {Partner} = require('../models')

module.exports = {
  async get (req, res) {
    try {
      const partners = await Partner.findAll({
        limit: 50
      })
      res.send(partners)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured while trying to fetch partner data'
      })
    }
  },
  async post (req, res) {
    try {
      const partners = await Partner.create(req.body)
      res.send(partners)
    } catch (err) {
      res.status(500).send({
        error: 'Error while creating Partner'
      })
    }
  }
}
