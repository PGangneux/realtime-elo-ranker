import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModuleBd } from './player/player.modulebd';
import { MatchModule } from './match/match.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      synchronize: true, 
    }),
    
    PlayerModuleBd,
    
    MatchModule,
    
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}