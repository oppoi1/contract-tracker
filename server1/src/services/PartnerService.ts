import { getRepository } from "typeorm"
import { Companies } from '../entities/Companies';
import { Partners } from "../entities/Partners";

export class PartnerService {
  private companyService = getRepository(Companies)
  private partnerService = getRepository(Partners)

  async get () {
    let partner: Partners = null

    try {
      partner = await this.partnerService.query(`
      SELECT p.*, comp.name as compName
      from Partners as p, Companies as comp
      where p.companyId = comp.id
      `)

      return partner
    } catch (error) {
      throw new Error('An error occured while trying to fetch partner data. #PSG#1')
    }
  }

  async getOne (id) {
    try {
      return this.partnerService.findOne(id)
    } catch (error) {
      throw new Error('Couldn\t find Partner' + error)
    }
  }

  async post (_body: any) {
    let partner: Partners = null
    let company: Companies = null
    partner = new Partners()
    partner.name = _body.name

    // Find Company
    try {
      company = await this.companyService.findOne({
        where: {
          name: _body.company
        }
      })
    } catch (error) {
      throw new Error('Can\'t find corresponding Company. #PSP#1')
    }

    partner.company = company
    partner.branch = _body.branch
    partner.phone = _body.phone
    
    // Save Partner
    try {
      return this.partnerService.save(partner)
    } catch (error) {
      throw new Error('Can\'t create Partner. #PSP#2')
    }
  }

  async put (id:number, _body: any) {
    let partner: Partners = null
    let company: Companies = null

    // Find Company
    try {
      company = await this.companyService.findOne({
        where: {
          name: _body.company
        }
      })
      if (!company) {
        company = new Companies()
        company.name = _body.companyName
        this.companyService.save(company)
      }
    } catch (error) {
      throw new Error('Can\'t find corresponding Company. #PSP#3')
    }

    // Find Partner
    try {
      partner = await this.partnerService.findOne(id)
    } catch (error) {
      throw new Error('Coudln\'t update Partner. #PSP#4')
    }

    partner.name = _body.name
    partner.branch = _body.branch
    partner.phone = _body.phone
    partner.company = company

    try {
      await this.partnerService.save(partner)
    } catch (error) {
      throw new Error('Couldn\'t update partner. #PSP#5')
    }
  }

  async delete (id: number) {
    let partner: Partners

    try {
      partner = await this.getOne(id)
    } catch (error) {
      throw new Error('Error Can\'t find Partner #PSD#1' + error)
    }

    partner.isActive = false

    try {
      this.partnerService.save(partner)
    } catch (error) {
      throw new Error('Couldn\'t update Partner. #PSD#2' + error)
    }
  }
}