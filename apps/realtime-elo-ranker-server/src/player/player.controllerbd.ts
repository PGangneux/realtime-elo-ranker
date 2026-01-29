import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDto } from './createplayer.dto';
import { PlayersServiceBd } from './player.servicebd';

@Controller('api/player')
export class PlayerControllerBd {
  constructor(private playersService: PlayersServiceBd) {}

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Post()
  create(@Body() body: CreatePlayerDto) {
    return this.playersService.create(body);
  }
}
