import { PartialType } from '@nestjs/swagger';
import { CreateBookingTourDto } from './create-booking-tour.dto';

export class UpdateBookingTourDto extends PartialType(CreateBookingTourDto) {}
