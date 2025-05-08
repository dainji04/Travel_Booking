import { OrderHistory } from "src/order-history/entities/order-history.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bill {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'float'})
    totalPrice:number

    @Column({type:'float'})
    paid:number

    @Column({type:'float'})
    mustPaid:number

    @ManyToOne(() => User , user => user.bills)
    user:User

    @OneToMany(() => OrderHistory , orderHistory => orderHistory.bill) 
    orderHistories:OrderHistory[]


}
