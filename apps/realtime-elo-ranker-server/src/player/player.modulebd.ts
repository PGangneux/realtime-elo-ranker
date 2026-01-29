import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerControllerBd } from './player.controllerbd';
import { PlayersServiceBd } from './player.servicebd';
import { Player } from './player.entity';
import { RankingModule } from '../ranking/ranking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), RankingModule],
  controllers: [PlayerControllerBd],
  providers: [PlayersServiceBd],
})
export class PlayerModuleBd {}
