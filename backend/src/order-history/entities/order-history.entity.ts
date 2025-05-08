import { Bill } from "src/bill/entities/bill.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderHistory {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    orderHistory_Day:Date

    @ManyToOne(() => User , user => user.orderHistories , {eager:true})
    user:User

    @ManyToOne(() => Tour , tour => tour.orderHistories , {eager:true})
    tour:Tour
    
    @ManyToOne(() => Bill, (bill) => bill.orderHistories, { eager: false })
    bill: Bill;
}
