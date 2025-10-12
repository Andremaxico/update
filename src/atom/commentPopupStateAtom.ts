import { atom } from "@zedux/react";


export const commentPopupState = atom<boolean>('commentPopupState', false);

export const postIdState = atom<string>('postIdState', '');