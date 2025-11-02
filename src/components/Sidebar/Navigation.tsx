import Link from 'next/link'
import React from 'react'
import { IoHome } from 'react-icons/io5'

type PropsType = object

export const Navigation: React.FC<PropsType> = ({}) => {
    return (
        <nav>
            <Link href='/' className="flex justify-between items-center gap-2 mb-2 p-3 hover:bg-gray-200 rounded-full duration-100">
                <div className="">
                    <IoHome className='size-6' />
                </div>
                <span className='hidden md:inline-block text-lg font-bold'>Home</span>
            </Link>
        </nav>
    )
}
