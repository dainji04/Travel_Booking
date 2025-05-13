import { Hotel } from "src/hotel/entities/hotel.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Location')
export class Location {

    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'varchar', length: 50, name: 'Name' })
    name: string;

    @Column({ type: 'text', nullable: true })
    Describe: string;

    @Column({ type: 'varchar', nullable: true, name: 'Avatar' })
    avatar: string;

    @OneToMany(() => Tour , tour => tour.Location , {cascade: true})
    Tours: Tour[];

    

    @OneToMany(() => Hotel , hotel => hotel.Location)
    Hotel: Hotel[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
