import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quest } from './quest.entity.js';

@Injectable()
export class QuestsService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepo: Repository<Quest>
  ) {}

  async create(
    title: string,
    description: string,
    playerId?: string
  ): Promise<Quest> {
    const quest = this.questRepo.create({
      title,
      description,
      status: 'pending',
      playerId,
    });
    return this.questRepo.save(quest);
  }

  async findAll(): Promise<Quest[]> {
    return this.questRepo.find({ relations: ['player'] });
  }

  async findByPlayer(playerId: string): Promise<Quest[]> {
    return this.questRepo.find({ where: { playerId }, relations: ['player'] });
  }

  async findById(id: string): Promise<Quest | null> {
    return this.questRepo.findOne({ where: { id }, relations: ['player'] });
  }

  async updateStatus(
    id: string,
    status: 'active' | 'completed' | 'pending'
  ): Promise<Quest | null> {
    await this.questRepo.update(id, { status });
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.questRepo.delete(id);
  }
}
