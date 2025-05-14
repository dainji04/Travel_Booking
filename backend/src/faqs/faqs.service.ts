import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faqs } from './entities/faq.entity';
import { Repository } from 'typeorm';
import { SearchFaqsDto } from './dto/search-faqs.dto';

@Injectable()
export class FaqsService {
 
  constructor(
    @InjectRepository(Faqs) private readonly faqsRepo:Repository<Faqs> 
  ){}

  async findOne(id:number) {
    const faq = await this.faqsRepo.findOne({
      where:{id},
      relations:['location']
    })
    if(!faq) throw new NotFoundException('Faqs not found')
    return faq
  }


  async findAll(searchDto:SearchFaqsDto) {
    const {
      page = 1,
      limit = 10,
      search,
      answer,
      question,
      locationId
    } = searchDto;

    const query = await this.faqsRepo.createQueryBuilder('faq')
    .leftJoinAndSelect('faq.location','location')
    .skip((page - 1) * limit)
    .take(limit)
    if(locationId)
    {
      query.andWhere('location.id= :locationId',{locationId})
    }

    if(search) {
      query.andWhere('faq.Answer LIKE :search',{search:`%${search}%`})

    }
    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };






  }
}
