import 'reflect-metadata'
import { createConnection } from 'typeorm';
import { Server } from './server';

createConnection().then(async connection => {
  const app = Server.bootstrap().app

  // start express server
  app.listen(3000)

  console.log('Magic happens on port 3000.')
}).catch(err => console.log(err))