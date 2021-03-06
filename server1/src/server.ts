// Import all dependencies
import express from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import logger from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
import multer from 'multer'
import * as path from 'path'
import { Request, Response } from 'express'
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv/config'
import { Routes } from './routes'
import { ContractService } from "./services/ContractServices";

export class Server {
  public app: express.Application
  public contractService = new ContractService()

  public static bootstrap(): Server {
    return new Server()
  }

  constructor() {
    this.app = express()
    this.config()
    this.api()
    setInterval(() => {
      this.contractService.checkExpirationDate()
    }, 43200000) // check every 12 hours
  }

    /**
     * Create Rest API routes
     * 
     * @class Server
     * @method api
     */
    public api() {
      // register express routes from defined application routes
      // check if middleware exists
      Routes.forEach(route => {
        if(route.middleware) {
          (this.app as any)[route.method] (route.route, /* middleware here!*/ route.middleware, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        });
        } else {
          (this.app as any)[route.method] (route.route, (req: Request, res: Response, next: Function) => {
              const result = (new (route.controller as any))[route.action](req, res, next)
              if (result instanceof Promise) {
                  result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

              } else if (result !== null && result !== undefined) {
                  res.json(result)
              }
          });
        }
      });

      this.app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      })
  }

  // Environment setup
  public config() {
    this.app.use(logger('tiny'))
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use("/uploads", express.static(path.join(__dirname, '../uploads')))
  }
}
