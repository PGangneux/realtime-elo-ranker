import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { RankingService } from './ranking.service';

@Controller('api/ranking')
export class RankingController {
  constructor(private rankingService: RankingService) {}

  @Get()
  getRanking() {
    return this.rankingService.getRanking();
  }

  @Get('events')
  getEvents(@Res() res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const unsubscribe = this.rankingService.subscribe((data) => {
      res.write(`event: message\ndata: ${JSON.stringify(data)}\n\n`);
    });

    res.on('close', () => {
      unsubscribe();
      res.end();
    });
  }
}
