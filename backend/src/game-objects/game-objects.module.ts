import { Module } from '@nestjs/common';
import { GameObjectsService } from './game-objects.service';
import { GameObjectsController } from './game-objects.controller';

@Module({
  providers: [GameObjectsService],
  controllers: [GameObjectsController],
})
export class GameObjectsModule {}
