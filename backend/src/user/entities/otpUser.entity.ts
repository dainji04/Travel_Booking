import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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


    @Column()
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}