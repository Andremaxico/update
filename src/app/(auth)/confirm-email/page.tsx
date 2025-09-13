import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {

    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <div className="flex flex-col items-center p-4 max-w-sm w-full rounded-lg shadow-md">
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
