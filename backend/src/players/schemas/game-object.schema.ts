import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class GameObject extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string; // artifact / quest / info

  @Prop({ type: Object, required: true })
  location: { type: string; coordinates: number[] }; // GeoJSON Point

  @Prop({ default: 'global' })
  layer: string;

  @Prop({ default: true })
  collectible: boolean;
}

export const GameObjectSchema = SchemaFactory.createForClass(GameObject);
