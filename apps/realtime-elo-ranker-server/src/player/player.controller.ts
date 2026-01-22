import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './createplayer.dto';
import { PlayersService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playersService: PlayersService) {}

  @Post()
  create(@Body() body: CreatePlayerDto) {
    return this.playersService.create(body);
  }
}
