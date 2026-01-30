export interface MatchResult {
  winner: {
    id: string;
    rank: number;
  };
  loser: {
    id: string;
    rank: number;
  };
}

export interface CreateMatchDto {
  winner: string;
  loser: string;
  draw?: boolean;
}
