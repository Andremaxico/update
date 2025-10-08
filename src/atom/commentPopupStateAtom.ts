import { atom } from "recoil";

export const commentPopupState = atom<boolean>({
    default: false,
    key: 'commentPopupState'
})