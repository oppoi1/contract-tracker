// smtp mailer?

// send mail if date is closer than expiration date
// Contract.find({}, (err, contracts) => {
//     if (err) {
//         console.log(err);
//     } else {
//         setInterval(() => {
//             contracts.forEach((contract) => {
//                 if(contract.expiration < Date.now) {
//                     mailing.smtpTransporter.sendMail(mailing.mail, (error, response) => {
//                         if(error) {
//                             console.log(error);
//                         } else {
//                             console.log("Message sent: " + response.message);
//                         }
//                         mailing.smtpTransporter.close();
//                     });
//                 }
//             });
//         }, 43200000); // send reminder every 12 hours
//     }
// });
/**
 *  Worker does not work for some reason
 */

import { Worker, isMainThread, parentPort } from 'worker_threads'
import '../worker.js'  


export class MailService {

  constructor() {
    this.worker.on('error', (error) => {
      console.log(error)
    })

  }

  // create new worker to send email
  private worker = new Worker('./src/worker.js', {
    workerData: {
      path: './worker.js',
      result: '',
    }
  })

  async send() {
    this.worker.on('message', (result) => {
      console.log(result);
    })
  }
}