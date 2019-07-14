import { NextFunction, Request, Response, request } from 'express'
import { CompanyService } from '../services/CompanyService';

export class CompanyController {
  private service: CompanyService = new CompanyService()

  async get(request: Request, response: Response, next: NextFunction) {
    try {
      return await this.service.get()
    } catch (error) {
      console.log(error)
      response.status(500).send({
        error: error
      })
    }
  }
}