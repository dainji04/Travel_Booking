import { Bill } from "src/bill/entities/bill.entity";
import { BookingTour } from "src/booking-tour/entities/booking-tour.entity";
import { Roles } from "src/util/common/role_User.common";
import { OrderHistory } from "src/order-history/entities/order-history.entity";
import { Rating } from "src/rating/entities/rating.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Account')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    Name: string;

    @Column({ unique: true , nullable:true })
    Email: string;

    @Column({ select: false , nullable:true })
    Password: string;

    @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
    Roles: Roles[];

    @Column({ nullable: true })
    ResetToken: string;

    @Column({ default: false })
    IsVerified: boolean;

    // relation

    @OneToMany(() => BookingTour, bt => bt.Acc)
    BookingTour: BookingTour[];

    @OneToMany(() => Rating, rating => rating.Acc)
    Ratings: Rating[];

    @OneToMany(() => Bill, bill => bill.Acc)
    Bills: Bill[];

    @OneToMany(() => OrderHistory, orderHistory => orderHistory.user)
    OrderHistories: OrderHistory[];
}
