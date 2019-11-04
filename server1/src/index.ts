import 'reflect-metadata'
import { createConnection } from 'typeorm';
import { Server } from './server';


createConnection().then(async connection => {
  // await connection.synchronize(true) // synchronizes models with datbase -> data may get lost
  const app = Server.bootstrap().app

  // start express server
  app.listen(3001)

  console.log('Magic happens on port 3000.')

}).catch(err => console.log(err))