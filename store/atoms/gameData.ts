import { atom } from "recoil";

interface Team {
    name: string;
}

interface CricketMatch {
    gameCode: string;
    id: number;
    overs: number;
    scoreCard: any;  // You can replace 'any' with a more specific type if you have the structure of the scoreCard
    started: boolean;
    teams: Team[];
    umpireId: number;
}

export const gameData = atom<CricketMatch>({
    key: "gameData",
    default: undefined,
  });
  