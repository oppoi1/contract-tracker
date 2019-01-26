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
  async getOne (req, res) {
    try {
      const partner = await Partner.findById(req.params.partnerId)
      res.send(partner)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `Couldn't find Partner you are looking for.`
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
