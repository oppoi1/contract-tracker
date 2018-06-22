const Joi = require('Joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email adress'
          })
          break
        case 'password':
          res.status(400).send({
            error:
              'Password provided failed to match the rules: <br/> 1. It must contain only lower and upper case and numerics <br/> 2. Must be between 8 and 32 characters long'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid email and password'
          })
      }
    } else {
      next()
    }
  }
}
