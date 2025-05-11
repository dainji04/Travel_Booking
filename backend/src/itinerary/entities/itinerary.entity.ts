import { Tour } from "src/tour/entities/tour.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./activity-itinerary.entity";

@Entity()
export class Itinerary {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:200})
    itinerary_Title:string

    @OneToMany(() => Activity, activity => activity.itinerary, { cascade: true })
    activities: Activity[];

    @ManyToOne(() => Tour, (tour) => tour.itineraries, { onDelete: 'CASCADE' })
    tour: Tour;


}
