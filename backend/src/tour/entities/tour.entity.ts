import { BookingTour } from "src/booking-tour/entities/booking-tour.entity";
import { TypeCar } from "src/common/type_Car.common";
import { Hotel } from "src/hotel/entities/hotel.entity";
import { Location } from "src/location/entities/location.entity";
import { OrderHistory } from "src/order-history/entities/order-history.entity";
import { Rating } from "src/rating/entities/rating.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    tour_name: string;

    @Column()
    tour_start: Date;

    @Column()
    tour_end: Date;

    @Column({ type: 'int', default: 0 })
    tour_totalPrice: number;

    @OneToMany(() => BookingTour , (bookingTour) => bookingTour.tour)
    bookingTours: BookingTour[];

    @Column({ type:'int',default:0})
    tour_Price:number

    @Column({type:'varchar',length:200 , nullable:true})
    tour_special:string

    @Column({type:'text' , array:true , nullable:true})
    tour_Imgs:string[]




    @ManyToOne(() => Location , location => location.tours)
    location: Location;

    @OneToMany(() => Rating, (rating) => rating.tour)
    ratings: Rating[];

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Hotel , hotel => hotel.tours)
    hotel: Hotel;
    
    @Column({ type: 'enum', enum: TypeCar, array: true, default: [] })
    tour_typeCars: TypeCar[]; 

    @OneToMany(()=> OrderHistory, orderHistory => orderHistory.tour) 
    orderHistories:OrderHistory[]

}
