import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { SearchBlogDto } from './dto/search-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}



  @Post()
  async createBlog(@Body() createBlogDto:CreateBlogDto) {
    const res = await this.blogService.createBlog(createBlogDto)
    return res
  }
  @Get()
  async getAllBlogs(@Query() searchBlogDto: SearchBlogDto) {
    const { page, limit } = searchBlogDto;
    const res = await this.blogService.findAll({ page, limit, ...searchBlogDto });
    return res;
  }
  @Patch(':id')
  async updateBlog(@Param('id') id:number ,@Body() updateBlogDto:UpdateBlogDto) {
    const res  = await this.blogService.updateBlog(id,updateBlogDto)
    return res
  }
  @Get(':id')
  async findOne(@Param('id') id:number) {
    const  res  = await this.blogService.findOne(id)
    return res
  }
  



}
