import { Location } from "src/location/entities/location.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:'varchar',length:50})
    name: string;

    @Column({type:'varchar',nullable:true})
    avatar: string;

    @Column({type:'decimal',transformer:{
        to:(value:number) => value,
        from:(value:string)=> parseFloat(value)
    }})
    rate: number;


    @Column({type:'text',array:true,nullable:true})
    images: string[];

    @Column({type:'varchar',length:100})
    address:string

    @Column({type:'text'})
    describes:string

    @Column({type:'decimal',nullable:true})
    price:number
    
    @OneToMany(() => Tour , tour => tour.hotel)
    tours: Tour[];

    @ManyToOne(() => Location , location => location.hotel)
    location: Location;

    @CreateDateColumn() 
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
