const Joi = require('joi')

module.exports = {
  /**
   * Validation of Name, Email and Password
   * then save user
   * @param {name, email, password} req
   * @param {send} res
   * @param {*} next
   */
  register (req, res, next) {
    const schema = {
      name: Joi.string().min(4).max(30),
      email: Joi.string().email({minDomainAtoms: 2}),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{4,32}$'))
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'You must provide a unique and valid name/email address.'
          })
          break
        case 'password':
          res.status(400).send({
            error:
              'Password provided failed to match the rules: <br/> 1. It must contain only lower and upper case and numerics <br/> 2. Must be between 8 and 32 characters long.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid name and password.'
          })
      }
    } else {
      next()
    }
  },
  /**
   * Validate data
   * then jump to next middleware if available
   * @param {name, email, password} req
   * @param {*} res
   * @param {*} next
   */
  update (req, res, next) {
    const schema = {
      name: Joi.string().min(4).max(30),
      email: Joi.string().email({minDomainAtoms: 2}),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{4,32}$'))
    }

    // checks if name and password fit to schema
    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'You must provide a unique and valid name. This error shouldn\'t occur.'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Password provided failed to match the rules.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid name, email and/or password.'
          })
      }
    } else {
      next()
    }
  }
}
