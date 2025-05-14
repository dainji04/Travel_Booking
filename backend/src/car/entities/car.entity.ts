import { Tour } from "src/tour/entities/tour.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Car')
export class Car {

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:'varchar',length:20})
    Type:string

    @Column({type:'varchar',length:200})
    Avatar:string

    @Column({type:'numeric' , scale:2})
    Price:number

    @UpdateDateColumn()
    updatedAt:Date

    @CreateDateColumn()
    createdAt:Date


    @ManyToMany(() => Tour , tour => tour.cars)
    tours:Tour[]


}
