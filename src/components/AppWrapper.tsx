'use client'

import { RecoilRoot } from "recoil"

type PropsType = {
    children: React.ReactNode
}

export const AppWrapper: React.FC<PropsType> = ({ children }) => {
    return (
        <RecoilRoot>
            { children }
        </RecoilRoot>
    )
}
