import { atom } from "recoil";

// Define the Match interface
interface Match {
    id: number;
    overs: number;
    scoreCard: any | null;
    finished: boolean;
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
  
  interface Team {
    id: number;
    matchId: Match[];
    name: string;
    ownerId: string;
    playedMatches: number;
    players: Player[];
  }

export const team = atom<Team>({
    key: "userData",
    default: undefined,
  });
  