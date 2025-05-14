import { OrderHistory } from "src/order-history/entities/order-history.entity";
import { Payment_Method } from "src/payment/entities/payment.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { Account } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Bill')
export class Bill {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'float' })
    Price: number

    @Column({ type: 'float' })
    Deposit: number

    @Column({ type: 'float' })
    MustPaid: number

    @Column({ type: 'float'  , nullable:true})
    Payable: number

    @Column({ type: 'text' })
    EmailClient: string

    @Column({ type: 'text' })
    NameClient: string

    @Column({ type: 'text' })
    CccdClient: string

    @ManyToOne(() => Account, user => user.Bills)
    Acc: Account

    @OneToMany(() => OrderHistory, orderHistory => orderHistory.bill)
    OrderHistories: OrderHistory[]

    @ManyToOne(() => Tour, tour => tour.Bills)
    Tour: Tour


    @ManyToOne(()=> Payment_Method , pm=>pm.Bills)
    Payment:Payment_Method
}
