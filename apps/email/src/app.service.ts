import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailConfigType, SendEmailDto } from '@repo/validation';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter;

  constructor(
    @Inject('SETTINGS_SERVICE') private settingsClient: ClientProxy,
  ) {}

  async getDomainInfo(domain: string) {
    return await lastValueFrom(
      this.settingsClient.send('domain.findOne', { domain: domain }),
    );
  }

  async getTempEmailInfo(email: string) {
    return await lastValueFrom(
      this.settingsClient.send('tempEmail.findOne', { email: email }),
    );
  }

  init(data: EmailConfigType) {
    const transporter = nodemailer.createTransport({
      host: data.host,
      port: data.port,
      secure: data.secure,
      auth: {
        user: data.user,
        pass: data.pass,
      },
    });
    this.transporter = transporter;
    return this;
  }

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
      mailOptions.inReplyTo = data.messageId;
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
