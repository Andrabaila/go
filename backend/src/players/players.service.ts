import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './schemas/player.schema';

type GeoJSONArea = {
  type: 'Polygon' | 'Point';
  coordinates: number[][] | number[];
};

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {}

  async create(username: string): Promise<Player> {
    const newPlayer = new this.playerModel({ username });
    const saved = await newPlayer.save();
    return saved as Player;
  }

  async findAll(): Promise<Player[]> {
    const result = await this.playerModel.find().exec();
    return result as Player[];
  }

  async findById(id: string): Promise<Player | null> {
    const player = await this.playerModel.findById(id).exec();
    return player as Player | null;
  }

  async addExploredArea(
    playerId: string,
    area: GeoJSONArea,
  ): Promise<Player | null> {
    const updated = await this.playerModel
      .findByIdAndUpdate(
        playerId,
        { $push: { exploredAreas: area } },
        { new: true },
      )
      .exec();
    return updated as Player | null;
  }
}
