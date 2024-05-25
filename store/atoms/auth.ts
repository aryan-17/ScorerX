import { atom } from "recoil";

export const signUpEmail = atom<String>({
    key:"email",
    default: ''
})

