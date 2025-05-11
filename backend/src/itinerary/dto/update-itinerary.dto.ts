import { PartialType } from '@nestjs/swagger';
import { CreateItineraryDto } from './create-itineraty.dto';

export class UpdateItineraryDto extends PartialType(CreateItineraryDto) {}
