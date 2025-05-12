import { OrderHistory } from "src/order-history/entities/order-history.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Bill')
export class Bill {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'float'})
    price:number

    @Column({type:'float'})
    deposit:number

    @Column({type:'float'})
    mustPaid:number

    @Column({type:'float'})
    payable:number

    @Column({type:'text'})
    emailClient:string

    @Column({type:'text'})
    nameClient:string

    @Column({type:'text'})
    cccdClient:string
    

    @ManyToOne(() => User , user => user.bills)
    user:User

    @OneToMany(() => OrderHistory , orderHistory => orderHistory.bill) 
    orderHistories:OrderHistory[]

    @ManyToOne(() => Tour , tour => tour.bills)
    tour:Tour


}
