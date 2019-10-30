import { ContractController } from './controllers/ContractController';
import { AuthenticationController } from './controllers/AuthenticationController';
import { CategoryController } from './controllers/CategoryController';
import { PartnerController } from './controllers/PartnerController';
import { CompanyController } from './controllers/CompanyController';
import { FileUploadController } from "./controllers/FileUploadController";
import multer from 'multer';
import * as path from 'path'
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
// const upload: any = multer({dest: 'uploads/'})
let storage: any = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload: any = multer({storage:storage})

/**
 * List of all routes
 */
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
  method: "get",
  route: "/contracts/all",
  controller: ContractController,
  action: "getAll"
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
{
  method: "get",
  route: "/users",
  controller: AuthenticationController,
  action: "get"
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
/**
 * Partner Routes
 */
{
  method: "get",
  route: "/partner",
  controller: PartnerController,
  action: "get"
},
/**
 * Company Service
 */
{
  method: "get",
  route: "/company",
  controller: CompanyController,
  action: "get"
},
/**
 * File Upload Route
 */
{
  method: "post",
  route: "/documents/upload/:contractId/:userId",
  controller: FileUploadController,
  middleware: upload.array('documents',12),
  action: "upload"
},
]