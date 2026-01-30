import { Injectable, BadRequestException } from '@nestjs/common';
import { RankingService } from '../ranking/ranking.service';
import { CreateMatchDto, MatchResult } from './match.dto';

@Injectable()
export class MatchService {
  private readonly K_FACTOR = 192; 

  constructor(private rankingService: RankingService) {}

  async processMatch(matchData: CreateMatchDto): Promise<MatchResult> {
    if (!matchData.winner || !matchData.loser) {
      throw new BadRequestException('Winner and loser are required');
    }

    // Get current rankings
    const ranking = await this.rankingService.getRanking();
    const winnerRank = ranking.find(p => p.id === matchData.winner)?.rank || 1000;
    const loserRank = ranking.find(p => p.id === matchData.loser)?.rank || 1000;

    let newWinnerRank = winnerRank;
    let newLoserRank = loserRank;

    const expectedWinner = this.calculateExpected(winnerRank, loserRank);
    const expectedLoser = this.calculateExpected(loserRank, winnerRank);

    if (matchData.draw) {
      // In a draw, ratings move towards each other
      newWinnerRank = Math.round(winnerRank + this.K_FACTOR * (0.5 - expectedWinner));
      newLoserRank = Math.round(loserRank + this.K_FACTOR * (0.5 - expectedLoser));
    } else {
      // Normal win/loss
      newWinnerRank = Math.round(winnerRank + this.K_FACTOR * (1 - expectedWinner));
      newLoserRank = Math.round(loserRank + this.K_FACTOR * (0 - expectedLoser));
    }

    // Update ranking service
    await this.rankingService.updatePlayerRank(matchData.winner, newWinnerRank);
    await this.rankingService.updatePlayerRank(matchData.loser, newLoserRank);

    return {
      winner: {
        id: matchData.winner,
        rank: newWinnerRank,
      },
      loser: {
        id: matchData.loser,
        rank: newLoserRank,
      },
    };
  }

  private calculateExpected(playerRank: number, opponentRank: number): number {
    return 1 / (1 + Math.pow(10, (opponentRank - playerRank) / 400));
  }
}
