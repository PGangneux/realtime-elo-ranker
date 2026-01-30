import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { Player } from '../player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [RankingController],
  providers: [RankingService],
  exports: [RankingService],
})
export class RankingModule {}
