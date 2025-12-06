import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  CreateBlogDto,
  CreateBlogSchema,
  SimpleResponseType,
  UpdateBlogDto,
  UpdateBlogSchema,
} from '@repo/validation';
import { ZodValidationPipe } from 'src/pipes/jod.validation.pipe';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Get()
  async findAll(
    @Query() query: { page: number; perPage: number; admin: string },
  ): Promise<SimpleResponseType> {
    const isAdmin = query.admin == 'true' ? true : false;
    const page = Number(query.page) || 1;
    const perPage = Number(query.perPage) || 10;
    const take = perPage;
    const skip = (page - 1) * perPage;

    const cacheKey = `blog:page=${page}:perPage=${perPage}`;
    if (!isAdmin) {
      const cachedTopics = await this.cacheManager.get(cacheKey);
      if (cachedTopics) {
        return {
          statusCode: HttpStatus.OK,
          data: cachedTopics,
          message: 'Blog post found successfully from cache',
        };
      }
    }

    const response = await this.blogService.findAll({
      take,
      skip,
      admin: isAdmin,
    });
    if (response) {
      await this.cacheManager.set(cacheKey, response, 86400000);
      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Blog post found successfully from database',
      };
    }
    return {
      statusCode: HttpStatus.NOT_FOUND,
      data: null,
      message: 'Blog post not found',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SimpleResponseType> {
    const response = await this.blogService.findOneById(+id);
    if (response) {
      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Blog post found successfully',
      };
    }
    return {
      statusCode: HttpStatus.NOT_FOUND,
      data: null,
      message: 'Blog post not found',
    };
  }

  @Get('/slug/:slug')
  async findOneBySlug(
    @Param('slug') slug: string,
  ): Promise<SimpleResponseType> {
    const response = await this.blogService.findOneBySlug(slug);
    console.log('response', response);
    if (response) {
      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Blog found successfully',
      };
    }
    return {
      statusCode: HttpStatus.NOT_FOUND,
      data: null,
      message: 'Blog not found',
    };
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateBlogSchema))
  async create(@Body() data: CreateBlogDto): Promise<SimpleResponseType> {
    const response = await this.blogService.create(data);
    if (response) {
      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Blog post created successfully',
      };
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      data: null,
      message: 'Blog post not created',
    };
  }

  @Patch(':id')
  //   @UsePipes(new ZodValidationPipe(UpdateBlogSchema))
  async update(
    @Body(new ZodValidationPipe(UpdateBlogSchema)) data: UpdateBlogDto,
    @Param('id') id: string,
  ): Promise<SimpleResponseType> {
    data.id = +id;
    const response = await this.blogService.update(data);
    if (response) {
      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Blog post updated successfully',
      };
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      data: null,
      message: 'Blog post not updated',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.blogService.remove(+id);
    if (response) {
      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Blog post deleted successfully',
      };
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      data: null,
      message: 'Blog post not deleted',
    };
  }
}
