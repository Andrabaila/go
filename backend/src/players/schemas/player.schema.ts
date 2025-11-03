import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const schemaOptions: SchemaOptions = { timestamps: true }; // или {}

@Schema(schemaOptions)
export class Player extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ type: Array, default: [] })
  exploredAreas: {
    type: 'Polygon' | 'Point';
    coordinates: number[][] | number[];
  }[];

  @Prop({ type: Array, default: [] })
  artifactsCollected: string[];
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
