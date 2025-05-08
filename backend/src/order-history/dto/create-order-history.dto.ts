import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateOrderHistoryDto {
    

    @ApiProperty({
        example: '2025-06-01T08:00:00.000Z',
        description: 'Ngày bắt đầu tour',
        type: String,
        format: 'date-time',
      })
      @IsString()
      orderHistory_Day:Date


    
      @ApiPropertyOptional(
        {
            example:'1',
            description:'ID của tour',
            type:Number

        }
      )
      tourId:number
    //   @IsNumber()
    //   @ApiPropertyOptional(
    //     {
    //         example:'1',
    //         description:'ID của tour'
    //     }
    //   )
    //   billId:
    



    


}
