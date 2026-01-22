import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from './interfaces/player.interfaces';
import { CreatePlayerDto } from './createplayer.dto';

@Injectable()
export class PlayersService {
    private players: Player[] = [];

    private idCounter = 1;

    create(c: CreatePlayerDto): Player {
        const newPlayer: Player = {
            id: Number(c.id),
        };

        this.players.push(newPlayer);
        return newPlayer;
    }

    findAll(): Player[]{
        return this.players;
    }

    findOne(id: number): Player {
        const player = this.players.find(player => player.id === id);
        if (!player){
            throw new NotFoundException(`Cat with id ${id} not found`);
        }
        return player;
    }
}
