import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlayersService } from './players.service';

// Тип для GeoJSON области
type GeoJSONArea = {
  type: 'Polygon' | 'Point';
  coordinates: number[][] | number[];
};

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async findAll() {
    return this.playersService.findAll();
  }

  @Post()
  async create(@Body('username') username: string) {
    return this.playersService.create(username);
  }

  @Post(':id/explored')
  async addExploredArea(
    @Param('id') id: string,
    @Body('area') area: GeoJSONArea, // заменили any на GeoJSONArea
  ) {
    return this.playersService.addExploredArea(id, area);
  }
}
