import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { RankingModule } from './ranking/ranking.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [PlayerModule, RankingModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
