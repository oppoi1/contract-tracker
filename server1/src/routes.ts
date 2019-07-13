import { ContractController } from './controllers/ContractController';
import { AuthenticationController } from './controllers/AuthenticationController';
import { CategoryController } from './controllers/CategoryController';
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

export const Routes = [
/**
 * Contract routes
 */
{
  method: "get",
  route: "/contracts",
  controller: ContractController,
  action: "index"
},
{
  method: "post",
  route: "/contracts",
  controller: ContractController,
  action: "post"
},
{
  method: "get",
  route: "/contracts/:contractId",
  controller: ContractController,
  action: "getOne"
},
{
  method: "put",
  route: "/contracts/:contractId",
  controller: ContractController,
  action: "put"
},
{
  method: "delete",
  route: "/contracts/:contractId",
  controller: ContractController,
  action: "delete"
},
/**
 * Authentication Routes
 */
{
  method: "post",
  route: "/register",
  controller: AuthenticationController,
  middleware: AuthenticationControllerPolicy.register,
  action: "register"
},
{
  method: "post",
  route: "/login",
  controller: AuthenticationController,
  action: "login"
},
{
  method: "post",
  route: "/authenticate",
  controller: AuthenticationController,
  action: "authenticate"
},
/**
 * Category Routes
 */
{
  method: "get",
  route: "/categories",
  controller: CategoryController,
  action: "get"
},
{
  method: "post",
  route: "/categories",
  controller: CategoryController,
  action: "post"
},
]