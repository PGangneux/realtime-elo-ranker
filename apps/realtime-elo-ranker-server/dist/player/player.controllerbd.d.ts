import { CreatePlayerDto } from './createplayer.dto';
import { PlayersServiceBd } from './player.servicebd';
export declare class PlayerControllerBd {
    private playersService;
    constructor(playersService: PlayersServiceBd);
    findAll(): Promise<import("./player.entity").Player[]>;
    create(body: CreatePlayerDto): Promise<import("./player.entity").Player>;
}
