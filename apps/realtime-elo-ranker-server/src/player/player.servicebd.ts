import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from './player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './createplayer.dto';
import { RankingService } from '../ranking/ranking.service';

@Injectable()
export class PlayersServiceBd {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    private rankingService: RankingService,
  ) {}

  async create(c: CreatePlayerDto): Promise<Player> {
    if (!c.id) {
      throw new Error('Player id is required.');
    }

    const newPlayer = this.playersRepository.create({
      id: c.id,
      rank: 1000,
    });

    await this.playersRepository.save(newPlayer);
    this.rankingService.updatePlayerRank(c.id, 1000);
    return newPlayer;
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
