import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModuleBd } from './player/player.modulebd';
import { RankingModule } from './ranking/ranking.module';
import { MatchModule } from './match/match.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(process.cwd(), 'db.sqlite'), // safer for CommonJS
      entities: [join(process.cwd(), '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    PlayerModuleBd,
    RankingModule,
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
