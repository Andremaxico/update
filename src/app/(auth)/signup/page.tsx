'use server'

import { AuthForm } from '@/components/SignIn/AuthForm'
import { SocialAuth } from '@/components/SignIn/SocialAuth'
import React from 'react'
import Link from 'next/link'

export default async function page() {
    return (
        <div className='h-[100vh] flex items-center justify-center'>
            <div className="flex flex-col items-center p-4 w-full max-w-sm bg-white rounded-lg shadow-lg">
                <h2 className='mb-3 text-2xl font-bold'>Реєстрація</h2>
                <div className="w-full mb-4">
                    <AuthForm type='signup' />
                </div>

                <div className="flex items-center text-sm mb-4">
                    <p className='mr-1'>Вже маєте акаунт?</p>
                    <Link href={'/signin'}>
                        <p className='text-blue-400 hover:text-blue-600 duration-75'>
                            Увійти
                        </p>
                    </Link>
                </div>

                <SocialAuth />
            </div>
        </div>
    )
}
