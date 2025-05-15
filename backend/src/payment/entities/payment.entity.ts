import { Bill } from "src/bill/entities/bill.entity";
import { BookingTour } from "src/booking-tour/entities/booking-tour.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Payment_Method')
export class Payment_Method {

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:'varchar' ,nullable:true})
    Method:string

    @Column({type:'varchar',nullable:true})
    Describe:string

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date

    @OneToMany(() => BookingTour, b => b.Payment)
    Book:BookingTour[]

    @OneToMany(() => Bill , b => b.Payment)
    Bills:Bill[]


}
