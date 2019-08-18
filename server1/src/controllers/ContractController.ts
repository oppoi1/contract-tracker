import { NextFunction, Request, Response, request } from 'express'
import { ContractService } from '../services/ContractServices';
import { Contracts } from '../entities/Contracts';
import { FileUploadService } from '../services/FileUploadService';

export class ContractController {
  private service: ContractService = new ContractService()
  private fileService: FileUploadService = new FileUploadService()

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return await this.service.get(request.query.search)
    } catch (error) {
      console.log(error)
      response.status(500).send({
        error: error
      })
    }
  }

  async getOne(request: Request, response: Response, next: NextFunction) {
    let contract: Contracts
    let files: any
    try {
      // return await this.service.getOne(request.params.contractId)
      contract = await this.service.getOne(request.params.contractId)
      files = await this.fileService.getFilesForOneContract(request.params.contractId)

      return { contract, files}
    } catch (error) {
      console.log(error)
      response.status(500).send({
        error: error
      })
    }
  }

  async post(request: Request, response: Response, next: NextFunction) {
    try {
      await this.service.post(request.body, request.files)
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
      response.send({
        message: 'Contract deleted successfully.'
      })
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      this.service.getAll()
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }
}