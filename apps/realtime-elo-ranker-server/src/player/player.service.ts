import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from './player.entity';
import { CreatePlayerDto } from './createplayer.dto';
import { RankingService } from '../ranking/ranking.service';

@Injectable()
export class PlayersService {
    private players: Player[] = [];

    private idCounter = 1;

    constructor(private rankingService: RankingService) {}

    create(c: CreatePlayerDto): Player {
        if (!c.id) {
            throw new Error('Player id is required.');
        }
        const newPlayer: Player = {
            id: c.id,
            rank: this.rankingService.getInitialRanking(),
        };

        this.players.push(newPlayer);
        this.rankingService.updatePlayerRank(c.id, this.rankingService.getInitialRanking());
        return newPlayer;
    }

    findAll(): Player[]{
        return this.players;
    }

    findOne(id: string): Player {
        const player = this.players.find(player => player.id === id);
        if (!player){
            throw new NotFoundException(`Player with id ${id} not found`);
        }
        return player;
    }
}
