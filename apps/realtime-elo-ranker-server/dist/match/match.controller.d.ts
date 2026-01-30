import { MatchService } from './match.service';
import type { CreateMatchDto } from './match.dto';
export declare class MatchController {
    private matchService;
    constructor(matchService: MatchService);
    create(body: CreateMatchDto): Promise<import("./match.dto").MatchResult>;
}
