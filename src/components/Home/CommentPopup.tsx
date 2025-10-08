'use client'

import { commentPopupState } from "@/atom/commentPopupStateAtom"
import { useRecoilState } from "recoil"

export const CommentPopup = ({}) => {
    const [ isOpen, setIsOpen ] = useRecoilState(commentPopupState);

    const closePopup = () => {
        setIsOpen(false);
    }

    return (
        <div>CommentPopup</div>
    )
}
