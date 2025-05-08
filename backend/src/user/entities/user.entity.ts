import { Bill } from "src/bill/entities/bill.entity";
import { BookingTourService } from "src/booking-tour/booking-tour.service";
import { BookingTour } from "src/booking-tour/entities/booking-tour.entity";
import { Roles } from "src/common/role_User.common";
import { OrderHistory } from "src/order-history/entities/order-history.entity";
import { Rating } from "src/rating/entities/rating.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
    roles: Roles[];
    @Column({nullable:true})
    resetToken:string
    @Column({default:false})
    isVerified:boolean


    //relation

    @OneToMany(() => BookingTour , bt => bt.bookingTour_user)
    bookingTour:BookingTour[]


    @OneToMany(() => Rating , rating => rating.user)
    ratings:Rating[]

    @OneToMany(() => Bill , bill =>bill.user)
    bills:Bill[]

    @OneToMany(() => OrderHistory , orderHistory => orderHistory.user)
    orderHistories:OrderHistory[]

  
}
