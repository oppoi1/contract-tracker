import { Company } from '../models'
const {Partner} = require('../models')

module.exports = {
  async get (req, res) {
    try {
      let partners = null
      let partnerCompany = []
      let fetchedCompany = null
      /**
       * get all partner
       * get all companys
       * map company to partner and return result
       */
      Partner.findAll({
        limit: 50
      })
        .then(partner => {
          partners = partner
          return Company.findAll()
        })
        .then(company => {
          fetchedCompany = company
          for (var i = 0; i < partners.length; i++) {
            partnerCompany[i] = {}
            partnerCompany[i].id = partners[i].id
            partnerCompany[i].name = partners[i].name
            partnerCompany[i].branch = partners[i].branch
            partnerCompany[i].phone = partners[i].phone
            partnerCompany[i].createdAt = partners[i].createdAt
            for (var j = 0; j < fetchedCompany.length; j++) {
              if (partners[i].CompanyId === fetchedCompany[j].id) {
                partnerCompany[i].company = fetchedCompany[j].name
                partnerCompany[i].address = fetchedCompany[j].address
              }
            }
          }
          res.send(partnerCompany)
        })
        .catch(err => console.log(err))
    } catch (err) {
      res.status(500).send({
        error: 'An error occured while trying to fetch partner data'
      })
    }
  },
  /**
   * get all partner
   * get all companys
   * map company to partner and return result
   * @param {*} req
   * @param {*} res
   */
  async show (req, res) {
    try {
      // the partner
      let partners
      // the companies
      let fetchedCompany
      // will be result
      let partnerCompany = {}
      Partner.findById(req.params.partnerId)
        .then(partner => {
          partners = partner
          return Company.findAll()
        })
        .then(company => {
          fetchedCompany = company
          for (var i = 0; i < fetchedCompany.length; i++) {
            if (partners.CompanyId === fetchedCompany[i].id) {
              partnerCompany.id = partners.id
              partnerCompany.name = partners.name
              partnerCompany.branch = partners.branch
              partnerCompany.phone = partners.phone
              partnerCompany.createdAt = partners.createdAt
              partnerCompany.company = fetchedCompany[i].name
              partnerCompany.address = fetchedCompany[i].address
            }
          }
          res.send(partnerCompany)
        })
        .catch(error => console.log(error))
      // const partner = await Partner.findById(req.params.partnerId)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `Couldn't find Partner you are looking for.`
      })
    }
  },
  /**
   * Create new Partner
   * Find Company
   * Assign Company to Partner
   * @param {*} req
   * @param {*} res
   */
  async post (req, res) {
    try {
      let body = req.body
      const partner = new Partner()
      partner.name = body.name

      const company = await Company.find({where: {
        name: body.company
      }})

      partner.CompanyId = company.id
      partner.branch = body.branch
      partner.phone = body.phone
      partner.save()
      res.send(partner)
    } catch (err) {
      res.status(500).send({
        error: 'Error while creating Partner'
      })
    }
  },
  /**
   * Check if Company exists
   * Check if Partner exists
   * then update Partner
   * @param {*} req
   * @param {*} res
   */
  async put (req, res) {
    let body = req.body
    let company
    try {
      company = await Company.findOne({where: {name: body.companyName}})
      if (!company) {
        company = new Company({name: body.companyName})
        await company.save()
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        error: 'Error while creating Company data.'
      })
    }

    try {
      const existingPartner = await Partner.findById(req.params.partnerId)
      if (!existingPartner) {
        const error = new Error(`Couldn't find partner`)
        error.code = 404
        throw error
      }

      req.body.CompanyId = company.id

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
  /**
   * Check if Partner exists then delete
   * @param {*} req
   * @param {*} res
   */
  async delete (req, res) {
    try {
      const existingPartner = await Partner.findById(req.params.partnerId)
      if (!existingPartner) {
        const error = new Error(`Couldn't find partner to delete.`)
        error.code = 404
        throw error
      }
      try {
        // TODO: set inactive, do not delete
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
