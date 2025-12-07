import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { Payload } from '@nestjs/microservices';
import { SendEmailDto, SendEmailSchema, SimpleResponseType } from '@repo/validation';
import { ZodValidationPipe } from 'src/pipes/jod.validation.pipe';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('/send')
  @UsePipes(new ZodValidationPipe(SendEmailSchema))
  async send(@Payload() data: SendEmailDto): Promise<SimpleResponseType> {
    // console.log('data', data);
    const result = await this.emailService.send(data);
    // console.log('result', result);
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
