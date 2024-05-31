import { atom } from "recoil";

interface Profile {
  id: number;
  Role: string | "ALL_ROUNDER";
  Runs: number | 0;
  Wicket: number | 0;
  Matches: number | 0;
  matchWon: number | 0;
  captain: boolean | false;
  umpireId: number | null;
  user: User;
  userId: string | null;
  team: Team | null;
  teamId: number | null;
  strikeRate: number;
  averageEconomy: number;
  manOfTheMatch: number;
  averageRuns: number;
  highestRuns: number;
  highestWickets: number;
}

interface Team {
  id: number;
  name: string;
  playedMatches: number;
  owner: User;
  ownerId: string;
  players: Profile[];
}

interface User {
  FirstName: string;
  LastName: string;
  email: string;
  photoUrl: string;
  Gender: "MALE" | "FEMALE";
  DOB: string;
  profile: Profile | null;
}

export const userData = atom<User>({
  key: "userData",
  default: undefined,
});
