import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Itinerary } from './itinerary.entity';

@Entity('Activity')
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    Name: string;

    @ManyToOne(() => Itinerary, itinerary => itinerary.Activities, { onDelete: 'CASCADE' })
    Itinerary: Itinerary;
}
