import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { TourService } from 'src/tour/tour.service';
import { TourModule } from 'src/tour/tour.module';

@Module({
  imports:[TypeOrmModule.forFeature([Blog]), TourModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
