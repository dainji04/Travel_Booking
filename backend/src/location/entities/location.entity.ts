import { Hotel } from "src/hotel/entities/hotel.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'text', nullable: true })
    location_Name: string;

    @Column({ type: 'text', nullable: true })
    location_Description: string;

    @Column({ type: 'text', nullable: true })
    location_Image: string;

    @OneToMany(() => Tour , tour => tour.location , {cascade: true})
    tours: Tour[];

   @OneToMany(() => Hotel , hotel => hotel.location)
   hotel: Hotel[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
