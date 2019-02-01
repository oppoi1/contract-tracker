const {Contract, Partner, Company, Category} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

Partner.Company = Partner.belongsTo(Company)
Partner.Contract = Partner.hasMany(Contract)
Company.Contract = Company.hasMany(Contract)

module.exports = {
  async index (req, res) {
    try {
      let contracts = null
      const search = req.query.search
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
      res.send(contracts)
    } catch (err) {
      res.status(500).send({
        error: 'an error occured while trying to fetch contracts'
      })
    }
  },
  async post (req, res) {
    let company = null
    let partner = null
    let category = null
    let body = req.body
    try {
      category = await Category.findOne({where: {name: body.categories}})
      if (!category) {
        category = new Category({name: body.categories})
        await category.save()
      }
      console.log(category.id)
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        error: 'Error while creating Category.'
      })
    }

    try {
      company = await Company.findOne({where: {name: req.body.partner}})
      if (!company) {
        company = new Company({name: req.body.partner})
        await company.save()
      }
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'Error while creating Company.'
      })
    }

    try {
      partner = await Partner.findOne({where: {name: req.body.optionalPartner.toLowerCase()}})
      if (!partner) {
        partner = await Partner.create({
          name: req.body.optionalPartner.toLowerCase(),
          CompanyId: company.id
        })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        error: 'Error while creating Partner.'
      })
    }

    try {
      let contract = await Contract.create({
        number: body.number,
        start: body.start,
        duration: body.duration,
        objectives: body.objectives,
        futureobjectives: body.futureobjectives,
        other: body.other,
        createdBy: body.createdBy,
        pricePerMonth: body.pricePerMonth,
        responsible: body.responsible,
        cancel: body.cancel,
        modifiedBy: body.modifiedBy || body.createdBy,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        PartnerId: partner.id,
        CategoryId: category.id,
        CompanyId: company.id
      })
      res.send(contract)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Error while creating contract.'
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
  },
  async get (req, res) {
    try {
      const contracts = await Contract.findAll({
        where: {
          categories: req.params.category
        }
      })
      res.send(contracts)
    } catch (err) {
      res.status(500).send({
        error: `an error occured while trying to fetch contracts from ${req.params.category}`
      })
    }
  }
}
