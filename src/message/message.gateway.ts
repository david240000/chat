import { Inject } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from './message.entity';
import { MessageService } from './message.service';


@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @Inject()
  messageService:MessageService

  @WebSocketServer()
  server: Server;
  
  count: number = 0; 
  
  async handleConnection(client: any, ...args: any[]) {
    this.count += 1;
    const messages: Message[] = await this.messageService.findAll();
    client.emit('all-mesages-to-client', messages)
  }


  handleDisconnect(client: any) {
    this.count -= 1;
  }


  afterInit(server: any) {
  }


  

  @SubscribeMessage('new-message-to-server')
  async sendMessage(@MessageBody() data: { sender: string, message: string}): Promise<void> {
    const message: Message = await this.messageService.createMessage(data.sender, data.message);
    this.server.emit('new-message-to-server', {message});
  }

  @SubscribeMessage('reaction-to-a-message')
  async sendreaction(@MessageBody() data: {id:number, emoji:string}): Promise<void>{
    const message: Message = await this.messageService.createReaction(data.id, data.emoji);
    this.server.emit('reaction-to-server', {message})
  }

  @SubscribeMessage('answer-to-a-message')
  async sendAnser(@MessageBody() data: {id:number, sender:string, answer: string}): Promise<void> {
    const message: Message = await this.messageService.createAnsware(data.id, data.sender, data.answer);
    this.server.emit('anser-to-a-message')
  }
}
