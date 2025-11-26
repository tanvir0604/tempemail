import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBlogDto, FindAllDto, UpdateBlogDto } from '@repo/validation';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BlogService {
  constructor(@Inject('BLOG_SERVICE') private newsClient: ClientProxy) {}

  async findAll(data: FindAllDto) {
    const response = this.newsClient.send('blog.findAll', data);
    return await lastValueFrom(response);
  }

  async findOneById(id: number) {
    const response = this.newsClient.send('blog.findOneById', id);
    return await lastValueFrom(response);
  }

  async findOneBySlug(slug: string) {
    const response = this.newsClient.send('blog.findOneBySlug', slug);
    return await lastValueFrom(response);
  }

  async create(data: CreateBlogDto) {
    const response = this.newsClient.send('blog.create', data);
    return await lastValueFrom(response);
  }

  async update(data: UpdateBlogDto) {
    const response = this.newsClient.send('blog.update', data);
    return await lastValueFrom(response);
  }

  async remove(id: number) {
    const response = this.newsClient.send('blog.remove', id);
    return await lastValueFrom(response);
  }
}
