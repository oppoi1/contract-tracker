import { NextFunction, Request, Response, request } from 'express'
import { PartnerService } from '../services/PartnerService';

export class PartnerController {
  private service: PartnerService = new PartnerService()

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