import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Coupon')
export class Coupon {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'integer'})
    Discount:number

    @UpdateDateColumn()
    updatedAt:Date
  
    @CreateDateColumn()
    createdAt:Date
}
