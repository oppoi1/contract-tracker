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
      let partnerContractObject = []
      let fetchedPartner
      const search = req.query.search
      /**
       * Search similar entry in db
       */
      if (search) {
        contracts = await Contract.findAll({
          where: {
            [Op.or]: [
              'number', 'partner', 'start', 'duration', 'category'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
        /**
         * Load all Contracts and Partner
         * Map if matched and return result
         */
      } else {
        Contract.findAll({
          limit: 50
        })
          .then(contract => {
            contracts = contract
            return Partner.findAll()
          })
          .then(partner => {
            fetchedPartner = partner
            for (var i = 0; i < contracts.length; i++) {
              partnerContractObject[i] = {}
              partnerContractObject[i].id = contracts[i].id
              partnerContractObject[i].number = contracts[i].number
              partnerContractObject[i].category = contracts[i].category
              partnerContractObject[i].duration = contracts[i].duration
              partnerContractObject[i].start = contracts[i].start
              partnerContractObject[i].createdBy = contracts[i].createdBy
              partnerContractObject[i].createdAt = contracts[i].createdAt
              for (var j = 0; j < fetchedPartner.length; j++) {
                if (contracts[i].PartnerId === fetchedPartner[i].id) {
                  partnerContractObject[i].partner = fetchedPartner[j].name
                }
              }
            }
            res.send(partnerContractObject)
          })
          .catch(err => console.log(err))
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error occured while trying to fetch contracts'
      })
    }
  },
  /**
   * Check if Category exists
   * Check if Company exists
   * Check if Partner exists
   * if not create
   * Then create Contract class instance and save it
   * @param {obj} req
   * @param {*} res
   */
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
        category: category.name,
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
  /**
   * Check if contract exists
   * if yes delete
   * @param {*} req
   * @param {*} res
   */
  // TODO: do not delete, set inactive
  async delete (req, res) {
    try {
      const existingContract = await Contract.findById(req.params.contractId)
      if (!existingContract) {
        const error = new Error(`Couldn't find contract to delete.`)
        error.code = 404
        throw error
      }
      try {
        await existingContract.destroy()
        return res.send({message: `Contract deleted successfully.`})
      } catch (error) {
        console.log(error)
        const throwbackError = new Error(`Couldn't delete Contract. Please ask your administrator.`)
        error.code = 404
        throw throwbackError
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: `Couldn't retrieve data: deleting Contract.`
      })
    }
  }
}
