import { Tour } from "src/tour/entities/tour.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:'varchar',length:50})
    name: string;

    @Column({type:'varchar',nullable:true})
    avatar: string;

    @Column({type:'varchar',nullable:true})
    detail_avatar: string;

    @Column({type:'decimal',transformer:{
        to:(value:number) => value,
        from:(value:string)=> parseFloat(value)
    }})
    star: number;

    @Column({type:'text',array:true,nullable:true})
    feature: string[];

    @Column({type:'varchar',length:100})
    city:string

    @Column({type:'varchar',length:100})
    address:string

    @Column({type:'decimal',nullable:true})
    price:number
    
    @OneToMany(() => Tour , tour => tour.hotel)
    tours: Tour[];

    @CreateDateColumn() 
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
