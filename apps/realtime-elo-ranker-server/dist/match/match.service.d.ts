import { RankingService } from '../ranking/ranking.service';
import { CreateMatchDto, MatchResult } from './match.dto';
export declare class MatchService {
    private rankingService;
    private readonly K_FACTOR;
    constructor(rankingService: RankingService);
    processMatch(matchData: CreateMatchDto): MatchResult;
    private calculateExpected;
}
