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
  async show (req, res) {
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
  },
  async put (req, res) {
    try {
      const existingPartner = await Partner.findById(req.params.partnerId)
      if (!existingPartner) {
        const error = new Error(`Couldn't find partner`)
        error.code = 404
        throw error
      }

      const partner = await Partner.update(req.body, {
        where: {
          id: req.params.partnerId
        }
      })
      res.send(partner)
    } catch (error) {
      res.status(500).send({
        error: `Couldn't update partner.`
      })
    }
  },
  async delete (req, res) {
    try {
      const existingPartner = await Partner.findById(req.params.partnerId)
      if (!existingPartner) {
        const error = new Error(`Couldn't find partner to delete.`)
        error.code = 404
        throw error
      }
      try {
        await existingPartner.destroy()
        return res.send({message: `Partner deleted successfully.`})
      } catch (error) {
        console.log(error)
        const throwbackError = new Error(`Couldn't delete partner. Please ask your administrator.`)
        error.code = 404
        throw throwbackError
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: `Couldn't retrieve data: deleting partner.`
      })
    }
  }
}
