import React from 'react'
import { MdErrorOutline } from "react-icons/md";

type PropsType = {
    className?: string,
}

export const Error: React.FC<PropsType> = ({className}) => {
    return (
        <div>
            <div className={`flex flex-col items-center ${className}`}>
                <MdErrorOutline className='size-8 text-red-600' />
            </div>
            <p className='text-lg font-bold'>Some error occured</p>
        </div>
    )
}
