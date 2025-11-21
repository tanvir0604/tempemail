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
import { TempEmailService } from './temp-email.service';
import {
  CreateTempEmailDto,
  FindAllDto,
  GetTempEmailListDto,
  SimpleResponseType,
  UpdateTempEmailDto,
} from '@repo/validation';

@Controller('temp-email')
export class TempEmailController {
  constructor(private readonly tempEmailService: TempEmailService) {}
  @Get()
  async getList(
    @Query() data: GetTempEmailListDto,
  ): Promise<SimpleResponseType> {
    let where = {};
    const params: FindAllDto = {
      where: where,
      take: data.pageSize,
      skip: data.pageNumber * data.pageSize - data.pageSize,
    };
    const res = await this.tempEmailService.getList(params);
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
    const res = await this.tempEmailService.getDetails(id);
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
  async create(@Body() data: CreateTempEmailDto) {
    const res = await this.tempEmailService.create(data);
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
  async update(@Param('id') id: string, data: UpdateTempEmailDto) {
    const res = await this.tempEmailService.update({ ...data, id });
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
    const res = await this.tempEmailService.delete(id);
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
