import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerControllerBd } from './player.controllerbd';
import { PlayersServiceBd } from './player.servicebd';
import { Player } from './player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerControllerBd],
  providers: [PlayersServiceBd],
  exports: [PlayersServiceBd],
})
export class PlayerModuleBd {}
