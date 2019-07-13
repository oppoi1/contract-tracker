import { NextFunction, Request, Response, request } from 'express'
import { ContractService } from '../services/ContractServices';

export class ContractController {
  private service: ContractService = new ContractService()

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return await this.service.getAll()
    } catch (error) {
      console.log(error)
      response.status(500).send({
        error: error
      })
    }
  }

  async getOne(request: Request, response: Response, next: NextFunction) {
    try {
      return await this.service.getOne(request.params.contractId)
    } catch (error) {
      console.log(error)
      response.status(500).send({
        error: error
      })
    }
  }

  async post(request: Request, response: Response, next: NextFunction) {
    try {
      await this.service.post(request.body)
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }

  async put(request: Request, response: Response, next: NextFunction) {
    try {
      this.service.put(request.body)
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      this.service.delete(request.params.contractId)
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }
}