import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { Payload } from '@nestjs/microservices';
import { SendEmailDto, SimpleResponseType } from '@repo/validation';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async send(@Payload() data: SendEmailDto): Promise<SimpleResponseType> {
    const result = await this.emailService.send(data);
    if (!result) {
      throw new BadRequestException();
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: result,
    };
  }
}
