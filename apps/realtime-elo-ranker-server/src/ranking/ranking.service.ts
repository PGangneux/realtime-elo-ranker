import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from 'src/player/player.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  private ranking: Player[] = [];
  private subscribers: Set<(data: any) => void> = new Set();

  async getRanking(): Promise<Player[]> {
    await this.updateRanking();
    return this.ranking.sort((a, b) => b.rank - a.rank);
  }

  
  // Retourne le ranking initial pour un nouveau joueur
  getInitialRanking(): number {
    if (this.ranking.length === 0) {
      return 500; // si aucun joueur, valeur par défaut
    }
    
    const sum = this.ranking.reduce((acc, player) => acc + player.rank, 0);
    return Math.round(sum / this.ranking.length); // moyenne arrondie
  }

  async updatePlayerRank(id: string, rank: number): Promise<void> {
    await this.playersRepository.update({ id }, { rank });
    await this.updateRanking();
    this.notifySubscribers({ type: 'RankingUpdate', player: { id, rank } });
  }

  private async updateRanking(): Promise<void> {
    this.ranking = await this.playersRepository.find();
  }

  subscribe(callback: (data: any) => void): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers(data: any): void {
    this.subscribers.forEach(callback => callback(data));
  }
}
