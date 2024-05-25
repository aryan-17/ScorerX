import { atom } from "recoil";

export const active = atom<Number>({
    key:"active",
    default:1
})