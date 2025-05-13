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
    Name: string;

    @Column({ nullable: true })
    DayStart: Date;

    @Column({ nullable: true })
    DayEnd: Date;

    @OneToMany(() => BookingTour, (bookingTour) => bookingTour.Tour)
    BookingTours: BookingTour[];

    @Column({ type: 'int', default: 0 })
    Price: number;

    @Column({ type: 'varchar', length: 200, nullable: true })
    Special: string;

    @Column({ type: 'text', array: true, nullable: true })
    Imgs: string[];

    @Column({ type: 'text', array: true, nullable: true })
    Includes: string[];

    @Column({ type: 'text', array: true, nullable: true })
    Excludes: string[];

    @Column({ type: 'varchar', length: 500 })
    Overview: string;

    @ManyToOne(() => Location, location => location.Tours)
    Location: Location;

    @OneToMany(() => Rating, (rating) => rating.Tour)
    Ratings: Rating[];

    @CreateDateColumn()
    CreatedAt: Date;

    @ManyToOne(() => Hotel, hotel => hotel.Tours)
    Hotel: Hotel;

    @Column({ type: 'enum', enum: TypeCar, array: true, default: [] })
    Type: TypeCar[];

    @OneToMany(() => OrderHistory, orderHistory => orderHistory.Tour)
    OrderHistories: OrderHistory[];

    @OneToMany(() => Itinerary, ite => ite.Tour, { cascade: true })
    Itineraries: Itinerary[];

    @OneToMany(() => Bill, bill => bill.Tour)
    Bills: Bill[];

    @OneToMany(() => Blog, blog => blog.Tour)
    Blogs: Blog[];
}
