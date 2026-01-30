"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("../ranking/ranking.service");
let MatchService = class MatchService {
    rankingService;
    K_FACTOR = 192;
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async processMatch(matchData) {
        if (!matchData.winner || !matchData.loser) {
            throw new common_1.BadRequestException('Winner and loser are required');
        }
        const ranking = await this.rankingService.getRanking();
        const winnerRank = ranking.find(p => p.id === matchData.winner)?.rank || 1000;
        const loserRank = ranking.find(p => p.id === matchData.loser)?.rank || 1000;
        let newWinnerRank = winnerRank;
        let newLoserRank = loserRank;
        const expectedWinner = this.calculateExpected(winnerRank, loserRank);
        const expectedLoser = this.calculateExpected(loserRank, winnerRank);
        if (matchData.draw) {
            newWinnerRank = Math.round(winnerRank + this.K_FACTOR * (0.5 - expectedWinner));
            newLoserRank = Math.round(loserRank + this.K_FACTOR * (0.5 - expectedLoser));
        }
        else {
            newWinnerRank = Math.round(winnerRank + this.K_FACTOR * (1 - expectedWinner));
            newLoserRank = Math.round(loserRank + this.K_FACTOR * (0 - expectedLoser));
        }
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
    calculateExpected(playerRank, opponentRank) {
        return 1 / (1 + Math.pow(10, (opponentRank - playerRank) / 400));
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ranking_service_1.RankingService])
], MatchService);
//# sourceMappingURL=match.service.js.map