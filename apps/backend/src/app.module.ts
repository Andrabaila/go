// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { GameObjectsModule } from './game-objects/game-objects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players/player.entity'; // сущность для Postgres

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'very-secret-password',
      database: 'go_game',
      entities: [Player],
      synchronize: true,
    }),
    PlayersModule,
    GameObjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
