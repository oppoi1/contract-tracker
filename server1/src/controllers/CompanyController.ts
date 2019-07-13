import { NextFunction, Request, Response, request } from 'express'
import { CompanyService } from '../services/CompanyService';

export class CompanyController {
  private service: CompanyService = new CompanyService()
}