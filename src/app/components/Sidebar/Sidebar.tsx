'use client'

import Link from 'next/link';
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

type PropsType = {}

export const Sidebar: React.FC<PropsType> = ({}) => {
    return (
        <aside className='flex flex-col items-start'>
            <Link href={'/'} className="flex items-center justify-center mb-2 p-4 rounded-full hover:bg-gray-200 duration-100">
                <FaXTwitter className='size-10' />
            </Link>
            <Link href='/' className="flex justify-between items-center gap-2 mb-2 p-3 hover:bg-gray-200 rounded-full duration-100">
                <div className="">
                    <IoHome className='size-6' />
                </div>
                <span className='hidden md:inline-block text-lg font-bold'>Home</span>
            </Link>
            <Link href={'/signin'}>
                <button 
                    className='text-white bg-blue-400 font-semibold text-lg py-2 px-10 rounded-full cursor-pointer hover:brightness-90 duration-100'
                >
                    Увійти
                </button>
            </Link>
        </aside>
    )
}
