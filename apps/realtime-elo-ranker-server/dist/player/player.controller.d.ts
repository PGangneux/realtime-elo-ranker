import { CreatePlayerDto } from './createplayer.dto';
import { PlayersService } from './player.service';
export declare class PlayerController {
    private playersService;
    constructor(playersService: PlayersService);
    create(body: CreatePlayerDto): import("./interfaces/player.interfaces").Player;
}
