import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { TourService } from 'src/tour/tour.service';
import { SearchBlogDto } from './dto/search-blog.dto';

@Injectable()
export class BlogService {
  
  constructor(
    @InjectRepository(Blog) private readonly blogRepo:Repository<Blog>,
    private readonly tourService:TourService
  ){}

  async createBlog(dto:CreateBlogDto):Promise<Blog> {
    const { thumbail , content, cover_img , tourId} = dto
    const tour = await this.tourService.getOne(tourId)
    if(!tour) throw new NotFoundException('Tour not found')
 
    const blog = this.blogRepo.create({
      Thumbail:thumbail , 
      Content:content , 
      Cover_img:cover_img,
      Tour:tour
    })
    return await this.blogRepo.save(blog)

    
  }

  async findOne(id:number) {
    const blog = await this.blogRepo.findOne({
      where:{id},
      relations:['Tour']

    })
    if(!blog) throw new NotFoundException('Blog not found')
    return blog
  }

  async findAll(searchBlogDto:SearchBlogDto)
  {
    const {
      page = 1,
      limit = 10,
      sortBy = 'Create_at',
      order = 'DESC',
      tourId,
      search,
    } = searchBlogDto;
    const allowedSortFields: (keyof Blog)[] = ['id', 'Thumbail', 'Cover_img', 'Content', 'Create_at'];
    const safeSortBy = allowedSortFields.includes(sortBy as keyof Blog) ? sortBy : 'Create_at';
    const query = this.blogRepo
    .createQueryBuilder('blog')
    .leftJoinAndSelect('blog.Tour', 'tour')
    .orderBy(`blog.${safeSortBy}`, order)
    .skip((page - 1) * limit)
    .take(limit);

    if (tourId) {
      query.andWhere('tour.id = :tourId', { tourId });
    }
  
    if (search) {
      query.andWhere('blog.Content LIKE :search', { search: `%${search}%` });
    }
    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async updateBlog(id:number,updateBlogDto:UpdateBlogDto) {
    const blog = await this.findOne(id)
    if(!blog) throw new NotFoundException('Blog not found')
    if(updateBlogDto.tourId) {
      const tour = await this.tourService.getOne(updateBlogDto.tourId)
      if(!tour) throw new NotFoundException('Tour not found')
      blog.Tour = tour
    }
    if (updateBlogDto.thumbail !== undefined) blog.Thumbail = updateBlogDto.thumbail;
    if (updateBlogDto.cover_img !== undefined) blog.Cover_img = updateBlogDto.cover_img;
    if (updateBlogDto.content !== undefined) blog.Content = updateBlogDto.content;
    return this.blogRepo.save(blog)
  }
  






}



