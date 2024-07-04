import { Match } from "@/data/Game/type";
import { atom } from "recoil";

export const jsonData = atom<Match>({
    key: "jsonData",
    default: undefined,
  });