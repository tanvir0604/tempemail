import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ZodError, ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType<unknown, any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((err) => {
          const path = err.path.join('.') || 'field';
          return `${path} ${err.message}`;
        });
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Validation failed',
            data: messages,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new BadRequestException('Invalid data');
    }
  }
}
