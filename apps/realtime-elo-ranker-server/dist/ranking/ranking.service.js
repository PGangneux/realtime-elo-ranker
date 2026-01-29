"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
let RankingService = class RankingService {
    ranking = [];
    subscribers = new Set();
    getRanking() {
        return this.ranking.sort((a, b) => b.rank - a.rank);
    }
    getInitialRanking() {
        console.log(this.ranking);
        if (this.ranking.length === 0) {
            return 500;
        }
        const sum = this.ranking.reduce((acc, player) => acc + player.rank, 0);
        return Math.round(sum / this.ranking.length);
    }
    updatePlayerRank(id, rank) {
        const existing = this.ranking.find(item => item.id === id);
        if (existing) {
            existing.rank = rank;
        }
        else {
            this.ranking.push({ id, rank });
        }
        this.notifySubscribers({ type: 'RankingUpdate', player: { id, rank } });
    }
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => {
            this.subscribers.delete(callback);
        };
    }
    notifySubscribers(data) {
        this.subscribers.forEach(callback => callback(data));
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)()
], RankingService);
//# sourceMappingURL=ranking.service.js.map