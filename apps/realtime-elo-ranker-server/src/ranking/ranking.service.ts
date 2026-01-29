import { Injectable } from '@nestjs/common';
import { RankingItem } from './interfaces/ranking.interfaces';

@Injectable()
export class RankingService {
  private ranking: RankingItem[] = [];
  private subscribers: Set<(data: any) => void> = new Set();

  getRanking(): RankingItem[] {
    return this.ranking.sort((a, b) => b.rank - a.rank);
  }

  
  // Retourne le ranking initial pour un nouveau joueur
  getInitialRanking(): number {
    console.log(this.ranking);
    if (this.ranking.length === 0) {
      return 500; // si aucun joueur, valeur par défaut
    }
    
    const sum = this.ranking.reduce((acc, player) => acc + player.rank, 0);
    return Math.round(sum / this.ranking.length); // moyenne arrondie
  }

  updatePlayerRank(id: string | number, rank: number): void {
    const existing = this.ranking.find(item => item.id === id);
    if (existing) {
      existing.rank = rank;
    } else {
      this.ranking.push({ id, rank });
    }
    this.notifySubscribers({ type: 'RankingUpdate', player: { id, rank } });
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
