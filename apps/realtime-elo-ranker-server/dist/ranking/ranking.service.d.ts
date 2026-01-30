import { Repository } from 'typeorm';
import { Player } from 'src/player/player.entity';
export declare class RankingService {
    private playersRepository;
    constructor(playersRepository: Repository<Player>);
    private ranking;
    private subscribers;
    getRanking(): Promise<Player[]>;
    getInitialRanking(): number;
    updatePlayerRank(id: string, rank: number): Promise<void>;
    private updateRanking;
    subscribe(callback: (data: any) => void): () => void;
    private notifySubscribers;
}
