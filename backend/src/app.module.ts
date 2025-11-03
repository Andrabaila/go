import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { GameObjectsModule } from './game-objects/game-objects.module';

@Module({
  imports: [PlayersModule, GameObjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
