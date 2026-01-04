import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Player } from '../players/player.entity.js';

@Entity()
export class Quest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'enum', enum: ['active', 'completed', 'pending'] })
  status!: 'active' | 'completed' | 'pending';

  @ManyToOne(() => Player, { nullable: true })
  @JoinColumn({ name: 'playerId' })
  player?: Player;

  @Column({ nullable: true })
  playerId?: string;
}
