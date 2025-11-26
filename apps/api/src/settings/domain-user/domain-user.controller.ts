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
import {
  CreateDomainUserDto,
  FindAllDto,
  GetDomainUserListDto,
  SimpleResponseType,
  UpdateDomainUserDto,
} from '@repo/validation';
import { DomainUserService } from './domain-user.service';

@Controller('domain-user')
export class DomainUserController {
  constructor(private readonly domainUserService: DomainUserService) {}
  @Get()
  async getList(
    @Query() data: GetDomainUserListDto,
  ): Promise<SimpleResponseType> {
    let where = {};
    const params: FindAllDto = {
      where: where,
      take: data.pageSize,
      skip: data.pageNumber * data.pageSize - data.pageSize,
    };
    const res = await this.domainUserService.getList(params);
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
    const res = await this.domainUserService.getDetailsById(id);
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
  async create(@Body() data: CreateDomainUserDto) {
    const res = await this.domainUserService.create(data);
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
  async update(@Param('id') id: string, @Body() data: UpdateDomainUserDto) {
    const res = await this.domainUserService.update({ ...data, id });
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
    const res = await this.domainUserService.delete(id);
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
