import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  generateUniqueSlug,
  type UpdateBlogDto,
  type CreateBlogDto,
  type FindAllDto,
} from '@repo/validation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('blog.findAll')
  async findAll(data: FindAllDto) {
    // console.log('fetching posts');
    const response = await this.appService.findAll({
      where: data.where,
      take: data.take,
      skip: data.skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return response;
  }

  @MessagePattern('blog.findOneBySlug')
  async findOneBySlug(slug: string) {
    const response = await this.appService.findOne({ where: { slug } });
    return response;
  }

  @MessagePattern('blog.findOneById')
  async findOneById(id: number) {
    // console.log(id);
    const response = await this.appService.findOne({ where: { id } });
    return response;
  }

  @MessagePattern('blog.create')
  async create(data: CreateBlogDto) {
    const response = await this.appService.upsert(
      { title: data.title },
      {
        title: data.title.trim(),
        image: data.image.trim(),
        slug: generateUniqueSlug(data.title, true),
        content: data.content.trim(),
        readingTime: data.readingTime,
        tag: data.tag.trim(),
        publishedAt: data.publishedAt ?? new Date(),
      },
    );
    return response;
  }

  @MessagePattern('blog.update')
  async update(data: UpdateBlogDto) {
    const response = await this.appService.update(
      { id: data.id },
      {
        title: data.title ? data.title.trim() : undefined,
        image: data.image ? data.image.trim() : undefined,
        slug: data.title ? generateUniqueSlug(data.title, true) : undefined,
        content: data.content ? data.content.trim() : undefined,
        readingTime: data.readingTime ? data.readingTime : undefined,
        tag: data.tag ? data.tag.trim() : undefined,
        publishedAt: data.publishedAt ? data.publishedAt : undefined,
      },
    );
    return response;
  }

  @MessagePattern('blog.remove')
  async remove(id: number) {
    const response = await this.appService.delete({ id: id });
    return response;
  }
}
