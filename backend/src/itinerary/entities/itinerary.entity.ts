import { Tour } from "src/tour/entities/tour.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./activity-itinerary.entity";

@Entity('Itinerary')
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  Title: string;

  @OneToMany(() => Activity, activity => activity.Itinerary, { cascade: true })
  Activities: Activity[];

  @ManyToOne(() => Tour, (tour) => tour.Itineraries, { onDelete: 'CASCADE' })
  Tour: Tour;
}
