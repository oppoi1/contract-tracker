import { categories } from '../entities/categories'
import { companies } from '../entities/companies'
import { contracts } from '../entities/contracts'
import { partners } from '../entities/partners'
import { getRepository } from 'typeorm'
import {NextFunction, Request, Response} from 'express'
import { Http2ServerResponse } from 'http2';

export class ContractController {
  private contractRepo = getRepository(contracts)

  async index(reqest: Request, response: Http2ServerResponse, next: NextFunction) {
    return this.contractRepo.find()
  }
}