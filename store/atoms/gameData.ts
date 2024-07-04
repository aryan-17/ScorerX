import { atom } from "recoil";

interface Match {
  id: number;
  overs: number;
  scoreCard: any | null;
  started: boolean;
}

interface Player {
  Matches: number;
  Role: string;
  Runs: number;
  Wicket: number;
  averageEconomy: number;
  averageRuns: number;
  captain: boolean;
  highestRuns: number;
  highestWickets: number;
  id: number;
  manOfTheMatch: number;
  matchWon: number;
  strikeRate: number;
  teamId: number;
  umpireId: any | null;
  user: User;
  userId: string;
}

interface User {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  password: string;
  DOB: string;
  Gender: string;
  createdAt: string;
  photoUrl: string;
  token: string;
}

interface Team {
  id: number;
  matchId: Match[];
  name: string;
  ownerId: string;
  playedMatches: number;
  players: Player[];
}

export interface CricketMatch {
  gameCode: string;
  id: number;
  overs: number;
  scoreCard: any; // You can replace 'any' with a more specific type if you have the structure of the scoreCard
  started: boolean;
  teams: Team[];
  umpireId: number;
  test?:number;
}

export const gameData = atom<CricketMatch>({
  key: "gameData",
  default: undefined,
});
