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
    async handleSendmailSignUp(email:string , otp:string)
    {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Thông báo đăng kí',
            text: `Bạn vừa đăng kí tài khoản của mình.vui lòng xác thực tài khoản của bạn bằng mã OTP: ${otp}`,
          };
      
          await this.transporter.sendMail(mailOptions); 
          console.log(`📨 Email đã được gửi tới: ${email}`);
    } 
    async handleSendmailSignIn(email:string)
    {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Thông báo đăng nhập',
            text: `Bạn vừa đăng nhập tài khoản của mình.`,
          };
      
          await this.transporter.sendMail(mailOptions); 
          console.log(`📨 Email đã được gửi tới: ${email}`);
    }

    async handleForgotPassword(email:string,resetToken:string)
    {
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to:email,
        subject: 'Reset Password',
        text: `Click vào link sau để đặt lại mật khẩu: http://localhost:5173/reset-password?token=${resetToken}`,
      };
  
      await this.transporter.sendMail(mailOptions);
      console.log(`📨 Email đã được gửi tới: ${email}`);
    }

    async handleResetPassword(email:string) {
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Reset Password',
        text: 'Your password has been successfully reset. If you did not request this, please contact support immediately.',
      };
      await this.transporter.sendMail(mailOptions)
      console.log(`📧 Password reset confirmation sent to ${email}`);

    }

    async handleSendMailBookingTour(email:string) 
    {
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Booking Tour',
        text: 'Booking tour has successfully.',
      };
      await this.transporter.sendMail(mailOptions)
      console.log(`📧 Booking tour confirmation sent to ${email}`);

    }
}
