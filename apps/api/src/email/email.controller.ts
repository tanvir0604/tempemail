import {
  BadRequestException,
  Controller,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { Payload } from '@nestjs/microservices';
import { SendEmailDto, SimpleResponseType } from '@repo/validation';

@Controller('email')
export class EmailController {
  constructor(
    private readonly logger = new Logger(EmailController.name),
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async send(@Payload() data: SendEmailDto): Promise<SimpleResponseType> {
    const result = await this.emailService.send(data);
    if (!result) {
      this.logger.error(result);
      throw new BadRequestException();
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: result,
    };
  }
}
