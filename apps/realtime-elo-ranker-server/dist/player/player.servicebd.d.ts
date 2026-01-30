import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePlayerDto } from './createplayer.dto';
export declare class PlayersServiceBd {
    private playersRepository;
    private eventEmitter;
    constructor(playersRepository: Repository<Player>, eventEmitter: EventEmitter2);
    create(c: CreatePlayerDto): Promise<Player>;
    save(player: Player): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player>;
}
