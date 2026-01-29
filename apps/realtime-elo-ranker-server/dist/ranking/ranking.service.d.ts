import { RankingItem } from './interfaces/ranking.interfaces';
export declare class RankingService {
    private ranking;
    private subscribers;
    getRanking(): RankingItem[];
    getInitialRanking(): number;
    updatePlayerRank(id: string | number, rank: number): void;
    subscribe(callback: (data: any) => void): () => void;
    private notifySubscribers;
}
