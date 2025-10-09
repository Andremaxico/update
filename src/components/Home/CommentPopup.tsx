'use client'

import { commentPopupState } from "@/atom/commentPopupStateAtom"
import { useAtomState } from "@zedux/react"
import { useRecoilState } from "recoil"

export const CommentPopup = ({}) => {
    const [ isOpen, setIsOpen ] = useAtomState(commentPopupState);

    const closePopup = () => {
        setIsOpen(false);
    }

    return (
        <div>CommentPopup</div>
    )
}
