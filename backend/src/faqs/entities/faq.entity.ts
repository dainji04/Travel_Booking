import { Location } from "src/location/entities/location.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Faqs')
export class Faqs {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar' , length:500})
    Question:string

    @Column({type:'varchar' , length:500})
    Answer:string


    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
    

    @ManyToOne(() => Location ,l=> l.faqs)
    location:Location
}
