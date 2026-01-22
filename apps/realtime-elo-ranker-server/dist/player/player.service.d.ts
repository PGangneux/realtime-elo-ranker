import { Player } from './interfaces/player.interfaces';
import { CreatePlayerDto } from './createplayer.dto';
export declare class PlayersService {
    private players;
    private idCounter;
    create(c: CreatePlayerDto): Player;
    findAll(): Player[];
    findOne(id: number): Player;
}
