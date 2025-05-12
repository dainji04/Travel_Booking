import { Tour } from "src/tour/entities/tour.entity";
import { Account } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('Rating')
@Unique(['Account', 'tour'])
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
    @ManyToOne(() => Account, (user) => user.ratings)
    Account: Account;

    @ManyToOne(() => Tour , (tour) => tour.ratings)
    tour: Tour;
}
