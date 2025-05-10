import { Tour } from "src/tour/entities/tour.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Itinerary {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:200})
    itinerary_Title:string

    @Column('text',{array:true})
    tinerary_Activity:string[]

    @ManyToOne(() => Tour, (tour) => tour.itineraries, { onDelete: 'CASCADE' })
    tour: Tour;
}
