// const AuthenticationController = require('./controllers/AuthenticationController')
// const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
// const ContractController = require('./controllers/ContractController')
import { ContractController } from './controllers/ContractController';
// const CategoryController = require('./controllers/CategoryController')
// const PartnerController = require('./controllers/PartnerController')
// const CompanyController = require('./controllers/CompanyController')

export default (app: any) => {
// TODO: route protection especially on post/put
// TODO: Joi validation
// https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=reddit&utm_medium=subreddit
  const contrl = new ContractController()
  /**
   * Authentication routes
   */
  // app.post(
  //   '/register',
  //   AuthenticationControllerPolicy.register,
  //   AuthenticationController.register
  // )
  // app.post('/login', AuthenticationController.login)
  // app.post('/authenticate', AuthenticationController.authenticate)
  // /**
  //  * Contract routes
  //  */
  app.get('/contracts', contrl.index)
  // app.get('/contracts/category/:category', ContractController.index)
  // app.post('/contracts', ContractController.post)
  // app.get('/contracts/:contractId', ContractController.show)
  // app.put('/contracts/:contractId', ContractController.put)
  // app.delete('/contracts/:contractId', ContractController.delete)

  // /**
  //  * Category routes
  //  */
  // app.get('/categories', CategoryController.get)
  // app.post('/categories', CategoryController.post)

  // /**
  //  * Partner routes
  //  */
  // app.get('/partner', PartnerController.get)
  // app.get('/partner/:partnerId', PartnerController.show)
  // app.put('/partner/:partnerId', PartnerController.put)
  // app.delete('/partner/:partnerId', PartnerController.delete)
  // app.post('/partner', PartnerController.post)

  // /**
  //  * Company routes
  //  */
  // app.get('/company', CompanyController.get)

  // /**
  //  * User administration routes
  //  */
  // app.get('/users', AuthenticationController.get)
  // app.put('/users', AuthenticationControllerPolicy.update, AuthenticationController.update)
}
