import { getRepository } from "typeorm"
import { Users } from '../entities/Users';
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

export class AuthenticationService {
  private authenticationService = getRepository(Users)

  /**
   * jwtSignUser
   */
  public jwtSignUser(user: any) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    })
  }

  async register (_body) {
    let user
    let userJson

    try {
      user = await this.authenticationService.create(_body)
      // userJson = user.toJson()
      userJson = JSON.stringify(user)
      return {user: userJson, token: this.jwtSignUser(user)}
    } catch (error) {
      console.log(error)
      throw new Error('Can\'t create User. #ASR#1')
    }
  }

  async login (_body) {
    const { name, password } = _body
    let user
    let isPasswordValid: boolean
    let userJson: Users

    try {
      user = await this.authenticationService.findOne({
        where: {
          name: name
        }
      })
    } catch (error) {
      throw new Error('The login information was incorrect.')
    }

    isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      throw new Error('The login information was incorrect.')
    }

    userJson = user.toJson()

    return {user: userJson, token: this.jwtSignUser(userJson)}
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
      await jwt.verify(oldToken, process.env.JWT_SECRET, (err) => {
        if (err) return false
      })
    }
    return true
  }
}