import { getRepository } from "typeorm"
import { Companies } from '../entities/Companies';

export class CompanyService {
  private companyService = getRepository(Companies)

  async get () {
    let companies: Companies = null

    try {
      companies = await this.companyService.query(`
      SELECT comp.*, p.name as partnername
      from Partners as p, Companies as comp
      where p.companyId = comp.id
      `)

      return companies
    } catch (error) {
      throw new Error('An error occured while trying to fetch partner data. #PSG#1')
    }
  }
}