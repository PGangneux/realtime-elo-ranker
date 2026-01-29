import type { Response } from 'express';
import { RankingService } from './ranking.service';
export declare class RankingController {
    private rankingService;
    constructor(rankingService: RankingService);
    getRanking(): import("./interfaces/ranking.interfaces").RankingItem[];
    getEvents(res: Response): void;
}
