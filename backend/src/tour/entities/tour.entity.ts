import { BookingTour } from "src/booking-tour/entities/booking-tour.entity";
import { Hotel } from "src/hotel/entities/hotel.entity";
import { Location } from "src/location/entities/location.entity";
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


    @ManyToOne(() => Location , location => location.tours)
    location: Location;

    @OneToMany(() => Rating, (rating) => rating.tour)
    ratings: Rating[];

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Hotel , hotel => hotel.tours)
    hotel: Hotel;
}
