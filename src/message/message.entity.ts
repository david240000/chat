import { type } from "os";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    sender:string;

    @Column('varchar')
    message: string;

    @ManyToOne(type => Message, message=>message.answers)
    answaredMessage:Message

    @OneToMany(type => Message, message =>  message.answaredMessage) 
    answers: Message[];

    @Column('varchar')
    emoji: string;
}