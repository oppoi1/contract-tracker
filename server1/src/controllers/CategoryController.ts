import { NextFunction, Request, Response } from 'express'
import { CategoryService } from '../services/CategoryService';

export class CategoryController {
  private service: CategoryService = new CategoryService()

  async get (request: Request, response: Response, next: NextFunction) {
    try {
      return this.service.get()
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }

  }

  async post (request: Request, response: Response, next: NextFunction) {
    try {
      return this.service.post(request.body)
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }
}
