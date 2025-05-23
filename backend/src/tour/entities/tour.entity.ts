import { Bill } from "src/bill/entities/bill.entity";
import { BookingTour } from "src/booking-tour/entities/booking-tour.entity";
import { TypeCar } from "src/util/common/type_Car.common";
import { Hotel } from "src/hotel/entities/hotel.entity";
import { Itinerary } from "src/itinerary/entities/itinerary.entity";
import { Location } from "src/location/entities/location.entity";
import { OrderHistory } from "src/order-history/entities/order-history.entity";
import { Rating } from "src/rating/entities/rating.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "src/blog/entities/blog.entity";
import { Car } from "src/car/entities/car.entity";

@Entity('Tour')
export class Tour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 , nullable:true })
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

    @Column({ type: 'varchar', length: 500  , nullable:true})
    Overview: string;

    @Column({ type: 'varchar', length: 500  , nullable:true})
    Thumbnail: string;

    @ManyToOne(() => Location, location => location.Tours)
    Location: Location;

    @OneToMany(() => Rating, (rating) => rating.Tour)
    Ratings: Rating[];

    @CreateDateColumn()
    CreatedAt: Date;

    @ManyToOne(() => Hotel, hotel => hotel.Tours)
    Hotel: Hotel;

      

    @OneToMany(() => OrderHistory, orderHistory => orderHistory.Tour)
    OrderHistories: OrderHistory[];

    @OneToMany(() => Itinerary, ite => ite.Tour, { cascade: true })
    Itineraries: Itinerary[];

    @OneToMany(() => Bill, bill => bill.Tour)
    Bills: Bill[];

    @OneToMany(() => Blog, blog => blog.Tour)
    Blogs: Blog[];

    @ManyToMany(() => Car , car => car.tours )
    @JoinTable({
      name: 'car_of_tour', 
      joinColumn: {
        name: 'tourId',
        referencedColumnName: 'id'
      },
      inverseJoinColumn: {
        name: 'carId',
        referencedColumnName: 'id'
      }
    })
    cars: Car[]
}
