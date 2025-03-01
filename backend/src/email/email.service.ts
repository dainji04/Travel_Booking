import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
    private transporter;

    constructor() {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }
    async handleSendmailSignUp(email:string)
    {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Thông báo đăng kí',
            text: `Bạn vừa đăng kí tài khoản của mình.`,
          };
      
          await this.transporter.sendMail(mailOptions);
          console.log(`📨 Email đã được gửi tới: ${email}`);
    }
    
}
