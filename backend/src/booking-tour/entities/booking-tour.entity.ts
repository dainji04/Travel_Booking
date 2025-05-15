import { StatusBookingTour } from "src/util/common/status_BookingTour.enum";
import { typeBooking } from "src/util/common/type_Booking.common";
import { Tour } from "src/tour/entities/tour.entity";
import { Account } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Payment_Method } from "src/payment/entities/payment.entity";

@Entity('Book')
export class BookingTour {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'timestamp'})
    Day:Date;

    @Column({type:'int',default:0})
    Deposit:number

    @Column({default:0 , type:'int'})
    Total_amount:number


    @UpdateDateColumn()
    updated_at:Date

    @Column({ type: 'enum', enum: typeBooking , default:typeBooking.CUSTOM })
    bookingTour_Type: typeBooking;  

    @Column({ type: 'jsonb', nullable: true })
    bookingTour_CustomDetails?: any;



    //relation

    @ManyToOne(() => Account , user => user.BookingTour)
    Acc:Account

    @ManyToOne(() => Tour , tour => tour.BookingTours)
    Tour:Tour

    @ManyToOne(() => Payment_Method , pm => pm.Book)
    Payment:Payment_Method

    

}
