import { NextFunction, Request, Response, request } from 'express'
import { PartnerService } from '../services/PartnerService';

export class PartnerController {
  private service: PartnerService = new PartnerService()
}