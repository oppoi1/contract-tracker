import { NextFunction, Request, Response, request } from 'express'
import { AuthenticationService } from '../services/AuthenticationService';
import { Users } from '../entities/Users';
import { getRepository } from 'typeorm';

export class AuthenticationController {
  private service: AuthenticationService = new AuthenticationService()
  private authenticationService = getRepository(Users)

  async register (request: Request, response: Response, next: NextFunction) {
    // try {
      return this.service.register(request.body)
    // } catch (error) {
    //   response.status(500).send({
    //     error: error
    //   })
    // }
  }

  async login (request: Request, response: Response, next: NextFunction) {
    let user: Users = new Users
    let isPasswordValid: boolean
    let userJson: Users

      try {
        const { name, password } = request.body

        try {
          user = await this.authenticationService.findOne({
            where: {
              name: name
            }
          })
        } catch (error) {
          console.log(error)
        }
  
        if (!user) {
          return response.status(403).send({
            error: 'The login information was incorrect.'
          })
        }
  
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
          return response.status(403).send({
            error: 'The login information was incorrect.'
          })
        }
        // const userJson = user.toJSON()
        userJson = JSON.stringify(user)
        
        response.send({
          user: userJson,
          token: this.service.jwtSignUser(userJson)
        })
      } catch (error) {
        response.status(500).send({
          error: 'An error has occured trying to log in.'
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