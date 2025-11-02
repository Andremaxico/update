import Link from 'next/link';
import React from 'react'

type PropsType = object;

export const LoginButton: React.FC<PropsType> = ({}) => {
    return (
        <Link href={'/signin'}>
            <button 
                className='text-white bg-blue-400 font-semibold text-lg py-2 px-10 rounded-full cursor-pointer hover:brightness-90 duration-100'
            >
                Увійти
            </button>
        </Link>
    )
}
