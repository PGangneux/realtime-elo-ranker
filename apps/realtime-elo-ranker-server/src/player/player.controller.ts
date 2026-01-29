import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDto } from './createplayer.dto';
import { PlayersService } from './player.service';

@Controller('api/player')
export class PlayerController {
  constructor(private playersService: PlayersService) {}

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Post()
  create(@Body() body: CreatePlayerDto) {
    return this.playersService.create(body);
  }
}
