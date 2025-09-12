'use server'

import { SignInForm } from '@/app/components/SignIn/SignInForm'
import { SocialSignIn } from '@/app/components/SignIn/SocialSignIn'
import React from 'react'
import { signup } from './actions'

export default async function page() {
    return (
        <div className='h-[100vh] flex items-center justify-center'>
            <div className="flex flex-col items-center p-4 w-full max-w-sm bg-white rounded-lg shadow-lg">
                <h2 className='mb-3 text-2xl font-bold'>Реєстрація</h2>
                <div className="w-full mb-8">
                    <SignInForm formAction={signup} />
                </div>
                <SocialSignIn />
            </div>
        </div>
    )
}
