import { Contracts } from "../entities/Contracts"
import { getRepository } from "typeorm"
import { Categories } from '../entities/Categories';
import { Companies } from '../entities/Companies';
import { Partners } from "../entities/Partners";

export class ContractService {
  private contractService = getRepository(Contracts)
  private categoryService = getRepository(Categories)
  private companyService = getRepository(Companies)
  private partnerService = getRepository(Partners)

  /**
   * Calculates the day difference between two dates
   * @class ContractService
   * @method getDaysDiffBetweenDates
   */
  public getDaysDiffBetweenDates(dateInitial, dateFinal) {
    return (dateFinal - dateInitial) / (1000 * 3600 * 24)
  } 

  async getAll() {
    try {
      return await this.contractService.find()
    } catch (error) {
      throw new Error('No contract found. #CS1') 
    }
  }

  async getOne(id: number) {
    try {
      return await this.contractService.findOne(id)
    } catch (error) {
      throw new Error(`No contract found with id: ${id} #CS2`)
    }
  }

  async post (_body: any) {
    let company: Companies = null
    let partner: Partners = null
    let category: Categories = null
    let contract: Contracts = null
    let duration: number

    // calculate duration
    duration = this.getDaysDiffBetweenDates(new Date(_body.start), new Date(_body.end))


    // Check if category exists
    try {
      category = await this.categoryService.findOne({
        where: {
          name: _body.categories
        }
      })
      if (!category) {
        category = new Categories()
        category.name = _body.categories
        this.categoryService.save(category)
      }
      console.log(category.id)
    } catch (error) {
      throw new Error('Error while creating Category. CSP#1')
    }

    // Check if Company exists
    try {
      company = await this.companyService.findOne({
        where: {
          name: _body.partner
        }
      })
      if (!company) {
        company = new Companies()
        company.name = _body.partner
        this.companyService.save(company)
      }
    } catch (error) {
      throw new Error('Error while creating Company. #CSP#2')
    }

    // Check if Partner exists
    try {
      partner = await this.partnerService.findOne({
        where: {
          name: _body.optionalerPartner
        }
      })

      if (!partner) {
        partner = new Partners()
        partner.name = _body.optionalPartner.toLowerCase()
        partner.company = company
        this.partnerService.save(partner)
        // partner = await this.partnerService.create({
        //   name: _body.optionalPartner.toLowerCase(),
        //   company: company
        // })
      }
    } catch (error) {
      throw new Error('Error while creating Partner. #CSP#3')
    }

    // Create Contract
    try {
      contract = await this.contractService.findOne({
        where: {
          number: _body.number
        }
      })
      if (!contract) {
        contract = new Contracts()
        contract.number = _body.number
        contract.start = _body.start
        contract.end = _body.end
        contract.duration = duration
        contract.objectives = _body.objectives
        contract.futureobjectives = _body.futureobjectives
        contract.other = _body.other
        contract.createdBy = _body.createdBy,
        contract.pricePerMonth = _body.pricePerMonth
        contract.responsible = _body.responsible
        contract.cancel = _body.cancel
        // contract.modifiedBy = _body.modifiedBy || _body.createdBy
        contract.partner = partner
        contract.category = category
        contract.company = company

        this.contractService.save(contract)
      }
    } catch (error) {
      throw new Error('Error while creating contract. #CSP#4')
    }
  }

  async put (body: any) {
    try {
      return await this.contractService.save(body)
    } catch (err) {
      throw new Error('Error while updating contract. #CSP#5')
    }
  }

  async delete (id: any) {
    let contract: Contracts
    // check if contract exists
    try {
      contract = await this.contractService.findOne(id)
      if (!contract) {
        throw new Error('Couldn\'t find contract to delete. #CSD#1')
      }

      contract.isActive = false
      try {
        await this.contractService.save(contract)
      } catch (error) {
        throw new Error('Couldn\'t delete contract. #CSD#2')
      }
    } catch (error) {
      throw new Error('Couldn\'t retrieve data: deleting Contract. #CSD#3')
    }
  }
}