import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { Payload } from '@nestjs/microservices';
import {
  SendEmailDto,
  SendEmailSchema,
  SimpleResponseType,
} from '@repo/validation';
import { ZodValidationPipe } from 'src/pipes/jod.validation.pipe';
import { EmailContentService } from 'src/settings/email-content/email-content.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly emailContentService: EmailContentService,
  ) {}

  @Post('/send')
  @UsePipes(new ZodValidationPipe(SendEmailSchema))
  async send(@Payload() data: SendEmailDto): Promise<SimpleResponseType> {
    // console.log('data', data);
    const result = await this.emailService.send(data);
    // console.log('result', result);
    if (!result) {
      throw new BadRequestException();
    }
    if (data.type == 'reply') {
      this.emailContentService.update({
        id: data.id,
        replyContent: data.html == '' ? data.text : data.html,
        repliedAt: new Date().toISOString(),
      });
    } else if (data.type == 'forward') {
      this.emailContentService.update({
        id: data.id,
        forwardEmail: data.to,
        forwardedAt: new Date().toISOString(),
      });
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: result,
    };
  }
}
