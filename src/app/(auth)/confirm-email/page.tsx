import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {

    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <div className="flex flex-col items-center p-4 max-w-sm w-full rounded-lg shadow-md">
                {data.user ?
                    <p>Вашу електронну пошту успішно підтверджено!</p>
                :
                    <>
                        <p className='mb-2 text-lg'>Підтвердіть свою електронну пошту</p>
                        <p>Лист висланий на <span className='font-bold'>email</span></p>
                    </>
                }
            </div>
        </div>
    )
}
