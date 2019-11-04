import nodemailer from "nodemailer";

export class MailService {
  private transporter: any = {}

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PW
      }
    })
  }

  async send (recipient: String, subject: String, text: String, html: String) {
    if(!recipient) return 'No recipient'
    if(!subject) return 'No subject'
    if(!text) return 'No text'
    if(!html) return 'No html'

    let info = await this.transporter.sendMail({
      from: 'david wanne oppoiwuha@gmail.com',
      to: recipient,
      subject: subject,
      text: text,
      html: html
    })
    return info.messageId
  }
}