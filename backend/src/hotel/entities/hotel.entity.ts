import { Location } from "src/location/entities/location.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Hotel')
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    Name: string;

    @Column({ type: 'varchar', nullable: true })
    Avatar: string;

    @Column({
        type: 'decimal',
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    Rate: number;

    @Column({ type: 'text', array: true, nullable: true })
    Images: string[];

    @Column({ type: 'varchar', length: 100 })
    Address: string;

    @Column({ type: 'text' })
    Describes: string;

    @Column({ type: 'decimal', nullable: true })
    Price: number;

    @OneToMany(() => Tour, tour => tour.Hotel)
    Tours: Tour[];

    @ManyToOne(() => Location, location => location.Hotel)
    Location: Location;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}
