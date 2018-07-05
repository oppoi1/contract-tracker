const {Contract} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  async index (req, res) {
    try {
      let contracts = null
      const search = req.query.search
      console.log(search)
      if (search) {
        contracts = await Contract.findAll({
          where: {
            [Op.or]: [
              'number', 'partner', 'start', 'duration', 'categories'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        contracts = await Contract.findAll({
          limit: 50
        })
      }
      console.log(contracts)
      res.send(contracts)
    } catch (err) {
      res.status(500).send({
        error: 'an error occured while trying to fetch contracts'
      })
    }
  },
  async post (req, res) {
    try {
      const contract = await Contract.create(req.body)
      res.send(contract)
    } catch (err) {
      res.status(500).send({
        error: 'Error while creating Contract'
      })
    }
  },
  async show (req, res) {
    try {
      const contract = await Contract.findById(req.params.contractId)
      res.send(contract)
    } catch (err) {
      res.status(500).send({
        error: 'Error while fetching contract'
      })
    }
  },
  async put (req, res) {
    try {
      const contract = await Contract.update(req.body, {
        where: {
          id: req.params.contractId
        }
      })
      res.send(contract)
    } catch (err) {
      res.status(500).send({
        error: 'Error while updating contract'
      })
    }
  }
}
