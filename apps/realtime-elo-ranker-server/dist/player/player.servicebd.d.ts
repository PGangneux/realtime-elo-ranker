import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './createplayer.dto';
import { RankingService } from '../ranking/ranking.service';
export declare class PlayersServiceBd {
    private playersRepository;
    private rankingService;
    constructor(playersRepository: Repository<Player>, rankingService: RankingService);
    create(c: CreatePlayerDto): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player>;
}
