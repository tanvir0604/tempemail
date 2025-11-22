import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmailContentService } from './email-content.service';
import {
  CreateEmailContentDto,
  FindAllDto,
  GetEmailContentListDto,
  SimpleResponseType,
  UpdateEmailContentDto,
} from '@repo/validation';

@Controller('email-content')
export class EmailContentController {
  constructor(private readonly emailContentService: EmailContentService) {}
  @Get()
  async getList(
    @Query() data: GetEmailContentListDto,
  ): Promise<SimpleResponseType> {
    let where = {};
    const params: FindAllDto = {
      where: where,
      take: data.pageSize,
      skip: data.pageNumber * data.pageSize - data.pageSize,
    };
    const res = await this.emailContentService.getList(params);
    if (!res) {
      throw new BadRequestException();
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: res,
    };
  }

  @Get('/:id')
  async getDetails(@Param('id') id: string): Promise<SimpleResponseType> {
    const res = await this.emailContentService.getDetails(id);
    if (!res) {
      throw new BadRequestException();
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: res,
    };
  }

  @Post()
  async create(@Body() data: CreateEmailContentDto) {
    if (!data.tempEmailRef) {
      throw new BadRequestException('parentId is required');
    }
    const res = await this.emailContentService.create(data);
    if (!res) {
      throw new BadRequestException();
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: res,
    };
  }

  @Put('/:id')
  async update(@Param('id') id: string, data: UpdateEmailContentDto) {
    const res = await this.emailContentService.update({ ...data, id });
    if (!res) {
      throw new BadRequestException();
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: res,
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const res = await this.emailContentService.delete(id);
    if (!res) {
      throw new BadRequestException();
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: res,
    };
  }
}
