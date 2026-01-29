import { Body, Controller, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import type { CreateMatchDto } from './match.dto';

@Controller('api/match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post()
  create(@Body() body: CreateMatchDto) {
    return this.matchService.processMatch(body);
  }
}
