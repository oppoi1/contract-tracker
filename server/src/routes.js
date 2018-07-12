const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ContractController = require('./controllers/ContractController')
const CategoryController = require('./controllers/CategoryController')
const PartnerController = require('./controllers/PartnerController')

module.exports = app => {
  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )
  app.post('/login', AuthenticationController.login)

  app.get('/contracts', ContractController.index)
  app.post('/contracts', ContractController.post)
  app.get('/contracts/:contractId', ContractController.show)
  app.put('/contracts/:contractId', ContractController.put)
  app.get('/categories', CategoryController.get)
  app.post('/categories', CategoryController.post)
  app.get('/partner', PartnerController.get)
  app.post('/partner', PartnerController.post)
}
