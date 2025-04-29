import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { Tour } from 'src/tour/entities/tour.entity';
import { isArray } from 'class-validator';
import { SearchHotelDto } from './dto/search-hotel.dto';

@Injectable()
export class HotelService {
 
    constructor(
        @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
        @InjectRepository(Hotel) private readonly hotelRepository: Repository<Hotel>,
    ) {}
    async findOne(id: number): Promise<Hotel> {
        const hotel = await this.hotelRepository.findOne({
            where:{id},
            relations:['tours']
        })
        if(!hotel) throw new NotFoundException('Hotel not found');
        return hotel
    }

    async create(createHotelDto:CreateHotelDto) {
        
        
        if(createHotelDto.star < 0 || createHotelDto.star > 5) {
            throw new BadRequestException('Star rating must be between 0 and 5');
        }
        if(createHotelDto.price <= 0 && createHotelDto.price !== undefined) {
            throw new BadRequestException('Price must be greater than 0');
        }
        createHotelDto.name = createHotelDto.name.trim();
        createHotelDto.city = createHotelDto.city.trim();
        createHotelDto.address = createHotelDto.address.trim();
        const hotel  =this.hotelRepository.create(createHotelDto)
        return await this.hotelRepository.save(hotel)
    }

    async findOneWithTours(id: number) {
        const hotel = await this.hotelRepository.findOne({
            where: { id },
        });
    
        if (!hotel) {
            throw new NotFoundException('Hotel not found');
        }
    
        const tours = await this.tourRepository
            .createQueryBuilder('tour')
            .leftJoin('tour.hotel', 'hotel')
            .leftJoin('tour.ratings', 'rating')
            .leftJoin('tour.bookingTours', 'booking')
            .where('hotel.id = :id', { id })
            .select([
                'tour.id',
                'tour.tour_name',
                'tour.tour_start',
                'tour.tour_end',
                'tour.tour_totalPrice',
            ])
            .getMany();
    
        return {
            ...hotel,
            tours,
        };
    }

    //update 
    async update(id: number, updateHotelDto: UpdateHotelDto) {
        const hotel = await this.hotelRepository.findOne({ where: { id } });
        if (!hotel) throw new NotFoundException('Hotel not found');
        if (updateHotelDto.star < 0 || updateHotelDto.star > 5) {
            throw new BadRequestException('Star rating must be between 0 and 5');
        }
        if (updateHotelDto.price !== undefined && updateHotelDto.price <= 0){
            throw new BadRequestException('Price must be greater than 0');
        }
        if(updateHotelDto.feature && !Array.isArray(updateHotelDto.feature)) {
            throw new BadRequestException('Feature must be an array');
        }
        Object.assign(hotel, updateHotelDto);
        return await this.hotelRepository.save(hotel);
    }

    async findAll(searchHotel:SearchHotelDto) {
        const {limit , page , address , name  , star , city , sort, price} = searchHotel
        const take = Number(limit) || 10;
        const currentPage = Number(page) || 1;
        const skip = (currentPage - 1) * take;

        const qh =this.hotelRepository.createQueryBuilder('hotel')
        .select([
                'hotel.id',
                'hotel.name',
                'hotel.city',
                'hotel.address',
                'hotel.star',
                'hotel.price',
                'hotel.feature',
                'hotel.createdAt',
                'hotel.updatedAt',
        ])
        .where('1=1')
        if(address) {
            qh.andWhere('hotel.address LIKE :address', { address: `%${address}%` });
        }
        if(name) {
            qh.andWhere('hotel.name LIKE :name', { name: `%${name}%` });
        }
        if(star) {
            qh.andWhere('hotel.star = :star', { star });
        }
        if(city) {
            qh.andWhere('hotel.city = :city', { city });
        }
        if(price) {
            qh.andWhere('hotel.price <= :price', { price });
        }
        if(sort) {
            const [field, order] = sort.split(':');
            qh.orderBy(`hotel.${field}`, order.toUpperCase() as 'ASC' | 'DESC');
        }
        else {
            qh.orderBy('hotel.createdAt', 'DESC');
        }
        const [items, total] = await qh
        .skip(skip)
        .take(take)
        .getManyAndCount();
        return {
            data: items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };

        

    }
    async removeHotel(id:number ) {
        const hotel = await this.hotelRepository.findOne({
            where:{id}
        })
        if(!hotel) throw new NotFoundException('Hotel not found')
        await this.hotelRepository.remove(hotel)
        return hotel
    }


}
