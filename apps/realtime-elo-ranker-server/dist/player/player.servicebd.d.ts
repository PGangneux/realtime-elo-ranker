import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePlayerDto } from './createplayer.dto';
import { RankingService } from '../ranking/ranking.service';
export declare class PlayersServiceBd {
    private playersRepository;
    private eventEmitter;
    private rankingService;
    constructor(playersRepository: Repository<Player>, eventEmitter: EventEmitter2, rankingService: RankingService);
    create(c: CreatePlayerDto): Promise<Player>;
    save(player: Player): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player>;
}
