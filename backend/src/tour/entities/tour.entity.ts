import { Bill } from "src/bill/entities/bill.entity";
import { BookingTour } from "src/booking-tour/entities/booking-tour.entity";
import { TypeCar } from "src/util/common/type_Car.common";
import { Hotel } from "src/hotel/entities/hotel.entity";
import { Itinerary } from "src/itinerary/entities/itinerary.entity";
import { Location } from "src/location/entities/location.entity";
import { OrderHistory } from "src/order-history/entities/order-history.entity";
import { Rating } from "src/rating/entities/rating.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "src/blog/entities/blog.entity";

@Entity('Tour')
export class Tour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({nullable:true})
    DayStart: Date;

    @Column({nullable:true})
    DayEnd: Date;

    @OneToMany(() => BookingTour , (bookingTour) => bookingTour.tour)
    bookingTours: BookingTour[];

    @Column({ type:'int',default:0})
    Price:number

    @Column({type:'varchar',length:200 , nullable:true})
    Special:string

    @Column({type:'text' , array:true , nullable:true})
    Imgs:string[]

    @Column({type:'text' , array:true , nullable:true})
    Includes:string[]

    @Column({type:'text' , array:true , nullable:true})
    Excludes:string[]

    @Column({type:'varchar' ,length:500})
    Overview:string


    @ManyToOne(() => Location , location => location.tours)
    location: Location;

    @OneToMany(() => Rating, (rating) => rating.tour)
    ratings: Rating[];

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Hotel , hotel => hotel.tours)
    hotel: Hotel;
    
    @Column({ type: 'enum', enum: TypeCar, array: true, default: [] })
    type: TypeCar[]; 

    @OneToMany(()=> OrderHistory, orderHistory => orderHistory.tour) 
    orderHistories:OrderHistory[]

    @OneToMany(() => Itinerary , ite => ite.tour , {cascade:true}) 
    itineraries:Itinerary[]

    @OneToMany(() => Bill , bill => bill.tour)
    bills:Bill[]

    @OneToMany(() => Blog  , blog => blog.tour)
    blogs:Blog[]

}
