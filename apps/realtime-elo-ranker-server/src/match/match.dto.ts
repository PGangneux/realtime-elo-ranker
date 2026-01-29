export interface MatchResult {
  winner: {
    id: string | number;
    rank: number;
  };
  loser: {
    id: string | number;
    rank: number;
  };
}

export interface CreateMatchDto {
  winner: string | number;
  loser: string | number;
  draw?: boolean;
}
