export interface Wicket {
  catch: string;
  bowled: string;
  stumped: string;
  runOut: string;
}

export interface Batsman {
  playerName: {
    runs: number;
    fours: number;
    balls: number;
    sixes: number;
    status: string;
    wicket: Wicket;
  };
}

export interface Bowler {
  playerName: {
    overs: number;
    runs: number;
    wickets: number;
  };
}

export interface FallOfWicket {
  playerName: string;
  score: string;
  overs: number;
}

export interface Extras {
  wide: number;
  noBall: number;
  legBy: number;
}

export interface Team {
  name:string;
  batsman: Batsman[];
  bowler: Bowler[];
  fallOfWickets: FallOfWicket[];
  extras: Extras;
  totalRuns: number;
  wickets: number;
  overs:number;
}

export interface Match {
  team1: Team;
  team2: Team;
}
