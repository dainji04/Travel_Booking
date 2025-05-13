import { Bill } from "src/bill/entities/bill.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { Account } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('OrderHistory')
export class OrderHistory {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    Day:Date

    @ManyToOne(() => Account , user => user.OrderHistories , {eager:true})
    user:Account

    @ManyToOne(() => Tour , tour => tour.OrderHistories , {eager:true})
    Tour:Tour
    
    @ManyToOne(() => Bill, (bill) => bill.OrderHistories, { eager: false })
    bill: Bill;
}
