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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersServiceBd = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("./player.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ranking_service_1 = require("../ranking/ranking.service");
let PlayersServiceBd = class PlayersServiceBd {
    playersRepository;
    rankingService;
    constructor(playersRepository, rankingService) {
        this.playersRepository = playersRepository;
        this.rankingService = rankingService;
    }
    async create(c) {
        if (!c.id) {
            throw new Error('Player id is required.');
        }
        const newPlayer = this.playersRepository.create({
            id: c.id,
            rank: 1000,
        });
        await this.playersRepository.save(newPlayer);
        this.rankingService.updatePlayerRank(c.id, 1000);
        return newPlayer;
    }
    async findAll() {
        return this.playersRepository.find();
    }
    async findOne(id) {
        const player = await this.playersRepository.findOne({ where: { id } });
        if (!player) {
            throw new common_1.NotFoundException(`Player with id ${id} not found`);
        }
        return player;
    }
};
exports.PlayersServiceBd = PlayersServiceBd;
exports.PlayersServiceBd = PlayersServiceBd = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ranking_service_1.RankingService])
], PlayersServiceBd);
//# sourceMappingURL=player.servicebd.js.map