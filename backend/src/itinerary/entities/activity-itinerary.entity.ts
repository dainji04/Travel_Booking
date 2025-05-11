import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Itinerary } from './itinerary.entity';

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    name: string;

    @ManyToOne(() => Itinerary, itinerary => itinerary.activities, { onDelete: 'CASCADE' })
    itinerary: Itinerary;
}
