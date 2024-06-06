import { atom } from "recoil";

export const modal = atom<Boolean>({
    key:"active",
    default:false
})