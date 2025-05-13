import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { Tour } from 'src/tour/entities/tour.entity';
import { isArray } from 'class-validator';
import { SearchHotelDto } from './dto/search-hotel.dto';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class HotelService {
 
    constructor(
        @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
        @InjectRepository(Hotel) private readonly hotelRepository: Repository<Hotel>,
        private readonly locationService:LocationService
    ) {}
    async findOne(id: number): Promise<Hotel> {
        const hotel = await this.hotelRepository.findOne({
            where:{id},
            relations:['Tours']
        })
        if(!hotel) throw new NotFoundException('Hotel not found');
        return hotel
    }

    async create(createHotelDto:CreateHotelDto) {

        const location = await this.locationService.findOne(createHotelDto.locationId);
        if (!location) {
            throw new NotFoundException('Location not found');
        }
        if(createHotelDto.rate < 0 || createHotelDto.rate > 5) {
            throw new BadRequestException('Star rating must be between 0 and 5');
        }
        if(createHotelDto.price <= 0 && createHotelDto.price !== undefined) {
            throw new BadRequestException('Price must be greater than 0');
        }
        createHotelDto.name = createHotelDto.name.trim();
        createHotelDto.city = createHotelDto.city.trim();
        createHotelDto.address = createHotelDto.address.trim();
       
        const hotel = this.hotelRepository.create({
            Name: createHotelDto.name,
            Price: createHotelDto.price,
            Rate: createHotelDto.rate,
            Address: createHotelDto.address,
            Location:location,
            Avatar: createHotelDto.avatar,
          });
          return await this.hotelRepository.save(hotel);
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
            .leftJoin('tour.Hotel', 'hotel')
            .leftJoin('tour.Ratings', 'rating')
            .leftJoin('tour.BookingTours', 'booking')
            .where('hotel.id = :id', { id })
            .select([
                'tour.id',
                'tour.Name',
                'tour.DayStart',
                'tour.DayEnd',
                'tour.Price',
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
        if (updateHotelDto.rate < 0 || updateHotelDto.rate > 5) {
            throw new BadRequestException('Star rating must be between 0 and 5');
        }
        if (updateHotelDto.price !== undefined && updateHotelDto.price <= 0){
            throw new BadRequestException('Price must be greater than 0');
        }
        if(updateHotelDto.images && !Array.isArray(updateHotelDto.images)) {
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
                'hotel.Name',
                'hotel.Address',
                'hotel.Rate',
                'hotel.Price',
                'hotel.CreatedAt',
                'hotel.UpdatedAt',
        ])
        .where('1=1')
        if(address) {
            qh.andWhere('hotel.Address LIKE :address', { address: `%${address}%` });
        }
        if(name) {
            qh.andWhere('hotel.Name LIKE :name', { name: `%${name}%` });
        }
        if(star) {
            qh.andWhere('hotel.Rate = :star', { star });
        }
        if(price) {
            qh.andWhere('hotel.Price <= :price', { price });
        }
        if(sort) {
            const [field, order] = sort.split(':');
            qh.orderBy(`hotel.${field}`, order.toUpperCase() as 'ASC' | 'DESC');
        }
        else {
            qh.orderBy('hotel.CreatedAt', 'DESC');
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
