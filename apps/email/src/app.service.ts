import { HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ReplyEmailDto } from '@repo/validation';

@Injectable()
export class AppService {
  private readonly transporter: nodemailer.Transporter;
  async send(data: ReplyEmailDto) {
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
      subject: `Re: ${data.subject}`,

      inReplyTo: data.messageId,
      references: data.references
        ? `${data.references} ${data.messageId}`
        : data.messageId,

      text: data.text,
      html: data.html,
    };

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
