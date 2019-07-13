import { NextFunction, Request, Response, request } from 'express'
import { AuthenticationService } from '../services/AuthenticationService';

export class AuthenticationController {
  private service: AuthenticationService = new AuthenticationService()

  async register (request: Request, response: Response, next: NextFunction) {
    try {
      return this.service.register(request.body)
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }

  async login (request: Request, response: Response, next: NextFunction) {
    try {
      return this.service.login(request.body)
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }

  async get (request: Request, response: Response, next: NextFunction) {
    try {
      return this.service.get()
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }

  async authenticate (request: Request, response: Response, next: NextFunction) {
    try {
      return this.service.authenticate(request.body)
    } catch (error) {
      response.status(500).send({
        error: error
      })
    }
  }
}