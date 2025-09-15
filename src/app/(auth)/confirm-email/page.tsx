import { FaArrowLeftLong } from "react-icons/fa6";
import React from 'react'
import Link from "next/link";

export default async function page() {

    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <div className="flex flex-col items-center p-4 max-w-sm w-full rounded-lg shadow-md">
                <Link href='/signup' className="w-full flex items-center justify-start">
                    <FaArrowLeftLong className="mr-1 text-gray-400" />
                    <p className="text-sm font-semibold text-gray-400">Повернутися назад</p>
                </Link>
                <p className='mb-2 text-xl'>Підтвердіть свою електронну пошту</p>
                <p className='text-lg'>Лист висланий на <span className='font-bold'>email</span></p>
                <p className='text-center'>
                    Після підтвердження увійдіть до свого акаунту. 
                    <br/>
                    Цю сторінку можна безпечно закривати
                </p>
            </div>
        </div>
    )
}
