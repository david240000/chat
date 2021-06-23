import { type } from "os";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    sender:string;

    @Column('varchar')
    message: string;

    @OneToOne(type => Message) 
    answer: Message;

    @Column('varchar')
    emoji: string;
}