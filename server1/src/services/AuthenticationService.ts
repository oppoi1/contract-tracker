import { getRepository } from "typeorm"
import { Users } from '../entities/Users';
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import bcrypt from 'bcryptjs';

export class AuthenticationService {
  private authenticationService = getRepository(Users)

  /**
   * jwtSignUser
   */
  public jwtSignUser(user: any) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    try {
      return jwt.sign(user, config.authentication.jwtSecret)
    } catch (error) {
      throw new Error(error)
    }
  }

  async register (_body: any) {
    let user: Users
    let userJson

    try {
      user = new Users()
      user.name = _body.name
      user.email = _body.email
      user.password = await bcrypt.hash(_body.password, 10)
      try {
        await this.authenticationService.save(user)
      } catch (error) {
        throw new Error(error)
      }

      userJson = JSON.stringify(user)
      return {user: userJson, token: this.jwtSignUser(_body)}
    } catch (error) {
      throw new Error('Can\'t create User. #ASR#1' + error)
    }
  }

  async get () {
    return await this.authenticationService.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      take: 15
    })
  }

  async authenticate (_body) {
    let user: Users
    let oldToken

    try {
      user = await this.authenticationService.findOne({
        where: {
          id: _body.user.id
        }
      })
    } catch (error) {
      console.log(error)
      return false
    }

    oldToken = _body.token

    if(oldToken) {
      await jwt.verify(oldToken, process.env.JWT_SECRET, (err: any) => {
        if (err) return false
      })
    }
    return true
  }
}