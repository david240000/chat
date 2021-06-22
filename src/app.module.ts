import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Message } from './message/message.entity';
import { MessageModule } from './message/message.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'consent',
    entities: [Message],
    synchronize: true,
  }),MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
