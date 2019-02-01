const { Company } = require('../models')

module.exports = {
  async get (req, res) {
    try {
      const company = await Company.findAll({
        limit: 50,
        attributes: ['id', 'name']
      })
      res.send(company)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: `An error occured while fetching Company data.`
      })
    }
  }
}
