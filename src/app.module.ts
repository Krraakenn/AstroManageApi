// src/app/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user_entity } from './user/entity/user.entity';
import { UserController } from './user/user.controller';
import { UsersService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Replace with your database host
      port: 5432, // Replace with your database port
      username: 'tristanus', // Replace with your database username
      password: '', // Replace with your database password
      database: 'saludb', // Replace with your database name
      entities: [user_entity],
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([user_entity]),
  ],
  controllers: [UserController],
  providers: [UsersService],
})
export class AppModule {}
