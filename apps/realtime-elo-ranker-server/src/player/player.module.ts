import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayersService } from './player.service';
import { RankingModule } from '../ranking/ranking.module';

@Module({
  imports: [RankingModule],
  controllers: [PlayerController],
  providers: [PlayersService],
})
export class PlayerModule {}
