import { Tour } from "src/tour/entities/tour.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('Rating')
@Unique(['user', 'tour'])
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'int'})
    rate: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;


    // retionship with user
    @ManyToOne(() => User, (user) => user.ratings)
    user: User;

    @ManyToOne(() => Tour , (tour) => tour.ratings)
    tour: Tour;
}
