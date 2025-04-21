import { BookingTour } from "src/booking-tour/entities/booking-tour.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;
}
