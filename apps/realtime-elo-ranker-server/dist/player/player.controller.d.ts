import { CreatePlayerDto } from './createplayer.dto';
import { PlayersService } from './player.service';
export declare class PlayerController {
    private playersService;
    constructor(playersService: PlayersService);
    findAll(): import("./interfaces/player.interfaces").Player[];
    create(body: CreatePlayerDto): import("./interfaces/player.interfaces").Player;
}
