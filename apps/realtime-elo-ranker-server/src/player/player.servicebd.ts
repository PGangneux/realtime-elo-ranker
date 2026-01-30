import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from './player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter'; 
import { CreatePlayerDto } from './createplayer.dto';
import { RankingUpdateEvent } from '../ranking/ranking.update.events';

@Injectable()
export class PlayersServiceBd {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    private eventEmitter: EventEmitter2, 
  ) {}

  async create(c: CreatePlayerDto): Promise<Player> {
    if (!c.id) {
      throw new Error('Player id is required.');
    }

    const newPlayer = this.playersRepository.create({
      id: c.id,
    });

    const savedPlayer = await this.playersRepository.save(newPlayer);

    this.eventEmitter.emit(
      'ranking.update',
      new RankingUpdateEvent(savedPlayer.id, savedPlayer.rank),
    );

    return savedPlayer;
  }


  async save(player: Player): Promise<Player> {
    return this.playersRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return this.playersRepository.find();
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playersRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }
}
