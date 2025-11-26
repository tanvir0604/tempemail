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
import { DomainService } from './domain.service';
import {
  CreateDomainDto,
  FindAllDto,
  GetDomainListDto,
  SimpleResponseType,
  UpdateDomainDto,
} from '@repo/validation';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}
  @Get()
  async getList(@Query() data: GetDomainListDto): Promise<SimpleResponseType> {
    let where = {};
    const params: FindAllDto = {
      where: where,
      take: data.pageSize,
      skip: data.pageNumber * data.pageSize - data.pageSize,
    };
    const res = await this.domainService.getList(params);
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
    const res = await this.domainService.getDetailsById(id);
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
  async create(@Body() data: CreateDomainDto) {
    const res = await this.domainService.create(data);
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
  async update(@Param('id') id: string, @Body() data: UpdateDomainDto) {
    const res = await this.domainService.update({ ...data, id });
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
    const res = await this.domainService.delete(id);
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
