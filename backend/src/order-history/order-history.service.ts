import { Injectable } from '@nestjs/common';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { UpdateOrderHistoryDto } from './dto/update-order-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderHistory } from './entities/order-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderHistoryService {

  constructor(
    @InjectRepository( OrderHistory) private readonly orderHistory:Repository<OrderHistory>
  ) {}

}
