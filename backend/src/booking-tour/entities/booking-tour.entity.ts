import { StatusBookingTour } from "src/common/status_BookingTour.enum";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
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


    //relation

    @ManyToOne(() => User , user => user.bookingTour)
    bookingTour_user:User

    

}
