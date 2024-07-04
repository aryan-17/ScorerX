export enum Status{
  NOT_OUT,
  OUT,
  YET_TO_BAT
}

export interface BattingStats {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  status: Status;
  strike: boolean;
}

export interface BowlingStats {
  runs: number;
  overs: number;
  wickets: number;
}

export interface Player {
  name: string;
  batting: BattingStats;
  bowling: BowlingStats;
}

export interface Team {
  name: string;
  players: Player[];
  totalRuns: number;
  wickets: number;
  overs: number;
}

export interface Match {
  team1: Team;
  team2: Team;
  maxOvers: number;
}