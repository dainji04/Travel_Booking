import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Otp')
export class Otp {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    email: string;

    @Column()
    otpHash: string;
    @Column()
    tempPassword: string;

    @Column()
    tempName: string;
    @Column({ type: 'timestamptz' , nullable:true }) 
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}