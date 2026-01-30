import type { Response } from 'express';
import { RankingService } from './ranking.service';
export declare class RankingController {
    private rankingService;
    constructor(rankingService: RankingService);
    getRanking(): Promise<import("../player/player.entity").Player[]>;
    getEvents(res: Response): void;
}
