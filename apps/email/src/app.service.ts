import { HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from '@repo/validation';

@Injectable()
export class AppService {
  private readonly transporter: nodemailer.Transporter;
  async send(data: SendEmailDto) {
    if (!data.to) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Email is required',
        data: '',
      };
    }
    console.log('sending email to ' + data.to);

    const mailOptions: any = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    };

    if (data.messageId) {
      mailOptions.inReplyT = data.messageId;
      mailOptions.references = data.references
        ? `${data.references} ${data.messageId}`
        : data.messageId;
    }

    try {
      const info = await this.transporter.sendMail(mailOptions);
      if (info.errors) {
        console.log(info.errors);
        return {
          statusCode: HttpStatus.UNRECOVERABLE_ERROR,
          message: info.errors,
          data: info,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Email sent successfully',
        data: info,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error sending email',
        data: error,
      };
    }
  }
}
