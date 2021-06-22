import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    sender:string;

    @Column('varchar')
    message: string;

    @Column()
    questionid: number;

    @Column('varchar')
    emoji: string;
}