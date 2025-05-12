import { StatusBookingTour } from "src/util/common/status_BookingTour.enum";
import { typeBooking } from "src/util/common/type_Booking.common";
import { Tour } from "src/tour/entities/tour.entity";
import { Account } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Book')
export class BookingTour {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'timestamp'})
    bookingTour_Date:Date;

    @Column({type:'int',default:0})
    bookingTour_Deposit:number

    @Column({default:0 , type:'int'})
    bookingTour_TotalPrice:number


    @UpdateDateColumn()
    updated_at:Date

    @Column({ type: 'enum', enum: typeBooking , default:typeBooking.CUSTOM })
    bookingTour_Type: typeBooking;  

    @Column({ type: 'text', nullable: true })
    bookingTour_CustomDetails?: string;



    //relation

    @ManyToOne(() => Account , user => user.bookingTour)
    bookingTour_user:Account

    @ManyToOne(() => Tour , tour => tour.bookingTours)
    tour:Tour

    

}
