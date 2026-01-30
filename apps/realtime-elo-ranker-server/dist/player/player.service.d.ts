import { Player } from './player.entity';
import { CreatePlayerDto } from './createplayer.dto';
import { RankingService } from '../ranking/ranking.service';
export declare class PlayersService {
    private rankingService;
    private players;
    private idCounter;
    constructor(rankingService: RankingService);
    create(c: CreatePlayerDto): Player;
    findAll(): Player[];
    findOne(id: string): Player;
}
