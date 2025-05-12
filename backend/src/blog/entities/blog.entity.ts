import { Tour } from "src/tour/entities/tour.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Blog')
export class Blog {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',length:200})
    Thumbail:string


    @Column({type:'varchar',length:200})
    Cover_img:string

    @Column({type:'varchar' ,length:500})
    Content:string

    @CreateDateColumn()
    Create_at:Date






    @ManyToOne(() => Tour , tour => tour.blogs)
    tour:Tour

}
