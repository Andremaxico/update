import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoSearchCircle } from 'react-icons/io5'

type PropsType = {}

export const Search: React.FC<PropsType> = ({}) => {
    return (
        <div className='
            w-full px-4 py-1 flex items-center justify-between 
            bg-gray-100 border-1 border-gray-300 rounded-full
        '>
            <input 
                className='outline-0 cursor-pointer'
                placeholder='Пошук'
            />
            <button className='cursor-pointer'>
                <CiSearch className='size-4' />
            </button>
        </div>
    )
}
