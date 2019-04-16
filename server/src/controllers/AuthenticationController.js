const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

/**
 * Set jwt expiration date
 * @param {obj} user
 */
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (error) {
      res.status(400).send({
        error: 'This name is already in use'
      })
    }
  },
  /**
   * check if user exists
   * check if pw matches
   * send token
   * @param {obj} req
   * @param {*} res
   */
  async login (req, res) {
    try {
      const { name, password } = req.body
      const user = await User.findOne({
        where: {
          name: name
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
  /**
   * find 15 users
   * @param {obj} req
   * @param {*} res
   */
  async get (req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        limit: 15
      })
      res.send(users)
    } catch (err) {
      res.status(500).send({
        error: `Error while fetching users ${err}`
      })
    }
  },
  // TODO: Admin interface is missing all features - fix and enhance
  async update (req, res) {
    try {
      const user = await User.update(req.body, {
        where: {
          name: req.params.name
        }
      })
      res.send(user)
    } catch (error) {
      res.status(500).send({
        error: 'Error while updating User'
      })
    }
  },
  /**
   * Check if token and userid is correct
   * @param {user model, token} req
   * @param {send} res
   */
  async authenticate (req, res) {
    try {
      const user = await User.findOne({where: {
        id: req.body.user.id
      }})

      if (!user) {
        res.status(500).send({
          error: `No user found with that id. Are you sure you're logged in?`
        })
      }
      const oldToken = req.body.token
      if (oldToken) {
        await jwt.verify(oldToken, process.env.JWT_SECRET, (err) => {
          if (err) {
            return res.send(false)
          }
        })
      }
      res.send(true)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Something went wrong while authenticating you'
      })
    }
  }
}
