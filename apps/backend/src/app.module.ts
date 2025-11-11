import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PlayersModule } from './players/players.module.js';
import { GameObjectsModule } from './game-objects/game-objects.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players/player.entity.js'; // сущность для Postgres

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
