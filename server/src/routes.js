const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ContractController = require('./controllers/ContractController')
const CategoryController = require('./controllers/CategoryController')
const PartnerController = require('./controllers/PartnerController')
const CompanyController = require('./controllers/CompanyController')

module.exports = app => {
  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )
  app.post('/login', AuthenticationController.login)

  app.get('/contracts', ContractController.index)
  app.get('/contracts/category/:category', ContractController.index)
  app.post('/contracts', ContractController.post)
  app.get('/contracts/:contractId', ContractController.show)
  app.put('/contracts/:contractId', ContractController.put)
  app.delete('/contracts/:contractId', ContractController.delete)
  app.get('/categories', CategoryController.get)
  app.post('/categories', CategoryController.post)
  app.get('/partner', PartnerController.get)
  app.get('/partner/:partnerId', PartnerController.show)
  app.put('/partner/:partnerId', PartnerController.put)
  app.delete('/partner/:partnerId', PartnerController.delete)
  app.post('/partner', PartnerController.post)
  app.get('/company', CompanyController.get)
  app.get('/users', AuthenticationController.get)
  app.put('/users', AuthenticationControllerPolicy.update, AuthenticationController.update)
  app.post('/authenticate', AuthenticationController.authenticate)
}
