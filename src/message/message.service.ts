import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {

    constructor(@InjectRepository(Message) private repository: Repository<Message>){}

    async findAll(): Promise<Message[]>{
        return this.repository.find();
    }

    async findOne(id: number): Promise<Message>{
        return this.repository.findOne(id);
    }

    async createMessage(sender: string, message: string): Promise<Message>{
        const newmessage: Message = new Message();
        newmessage.sender = sender;
        newmessage.message = message;
        return await this.repository.save(newmessage);
    }

    async createReaction(id:number, emoji:string): Promise<any>{
        const message: Message = await this.findOne(id);
        message.emoji = emoji;
        return await this.repository.update(id, message);
    }

    async createAnsware(messageid:number,sender:string, answer:string): Promise<any>{
        const newmessage: Message = await this.createMessage(sender, answer);
        const message: Message = await this.findOne(messageid);
        message.answer = newmessage;
        return await this.repository.update(messageid,message);
    }
}
