'use server'

import Link from 'next/link'
import React from 'react'
import { SocialAuth } from '@/components/SignIn/SocialAuth'
import { AuthForm } from '@/components/SignIn/AuthForm'

export default async function page() {
    return (
        <div className='h-[100vh] flex items-center justify-center'>
            <div className="flex flex-col items-center p-4 w-full max-w-sm bg-white rounded-lg shadow-lg">
                <h2 className='mb-3 text-2xl font-bold'>Вхід</h2>
                <div className="w-full mb-4">
                    <AuthForm type='signin' />
                </div>

                <div className="flex items-center text-sm mb-4">
                    <p className='mr-1'>Ще не маєте акаунта?</p>
                    <Link href={'/signup'}>
                        <p className='text-blue-400 hover:text-blue-600 duration-75'>
                            Зареєструватися
                        </p>
                    </Link>
                </div>

                <SocialAuth />
            </div>
        </div>
    )
}
