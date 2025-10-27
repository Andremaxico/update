import React from 'react'
import { ClipLoader } from 'react-spinners'

type PropsType = {
    size?: 'sm' | 'md' | 'lg',
    className?: string,
}

export const Loader: React.FC<PropsType> = ({ size = 'md', className }) => {
    return (
        <div className={`w-full flex justify-center ${className}`}>
            <ClipLoader 
                size={size == 'md' ? 32 : size == 'sm' ? 16 : 64}
            />
        </div>
    )
}
