import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayersService } from './player.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayersService],
})
export class PlayerModule {}
