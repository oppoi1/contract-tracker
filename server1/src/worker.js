const { workerData, parentPort, isMainThread } = require('worker_threads')
const path = require('path')
require('ts-node').register()
require(path.resolve(__dirname, './worker.js'))
const nodemailer = require('nodemailer')

// const { Worker, isMainThread, parentPort } = require('worker_threads')

// if (isMainThread) {
//   // const worker = new Worker(__filename)
//   // worker.on('message', (msg) => {
//   //   console.log(msg)
//   // })
//   // worker.on('error', (error) => {
//   //   console.log(error)
//   // })
//   // worker.on('exit', (exitCode) => {
//   //   console.log(`exit: ${exitCode}`)
//   // })
// } else {
//   parentPort.postMessage('Hello world')
// }

async function send () {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PW
    }
  })
  let info = await transporter.sendMail({
    from: 'david wanne oppoiwuha@gmail.com',
    to: 'oppoi@wow.com',
    subject: 'hi1',
    text: 'hello?',
    html: '<b>Hello</b>'
  })
  return info.messageId
}

async function sendMail () {
  return send()
}

if (!isMainThread) {
  const message = sendMail()

  message.then((result) => {
    parentPort.postMessage('message sent' + result)
  }).catch(err => console.log('err' + err))
}

// if (!isMainThread) {
//   parentPort.postMessage('Hello')
// }
