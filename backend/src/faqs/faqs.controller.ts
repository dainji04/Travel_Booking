import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchFaqsDto } from './dto/search-faqs.dto';

@Controller('faqs')
@ApiTags('Fags')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}
  @ApiOkResponse({status:200, description: 'Lấy Faqs theo ID thành công' })
  @ApiBadRequestResponse({status:400, description: 'Lấy Faqs theo ID thất bại' })
  @ApiNotFoundResponse({ status:404, description: 'Không tìm thấy Faqs' })
  @ApiOperation({ summary: 'get Faqs successfully' })
  @Get(':id')
  async findOne(@Param('id') id:number) {
    const res = await this.faqsService.findOne(id)
    return res


  }
    @Get()
    @ApiOkResponse({status:200, description: 'Lấy Faqs thành công' })
    @ApiBadRequestResponse({status:400, description: 'Lấy Faqs thất bại' })
    @ApiNotFoundResponse({ status:404, description: 'Không tìm thấy Faqs' })
    async getAllBlogs(@Query() searchBlogDto: SearchFaqsDto) {
      const { page, limit } = searchBlogDto;
      const res = await this.faqsService.findAll({ page, limit, ...searchBlogDto });
      return res;
    }

  



}
