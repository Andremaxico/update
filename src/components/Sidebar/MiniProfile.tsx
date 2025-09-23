import { createClient } from '@/utils/supabase/server';
import React from 'react'
import { LoginButton } from './LoginButton';
import Image from 'next/image';
import { SignOutButton } from './SignOutButton';
import { User } from '@supabase/supabase-js';

type PropsType = {
    data: { user: User } | { user: null }
};

export const MiniProfile: React.FC<PropsType> = ({data}) => {

    return (
        <>
            <SignOutButton />
            <div className='py-2 px-4 w-full flex items-center justify-between rounded-full hover:bg-gray-50'>
                <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
                    <Image 
                        width={90}
                        height={90}
                        src={data.user?.user_metadata.picture || null}
                        alt='avatar'
                        className='h-full w-full object-cover'
                    />
                </div>
                <div className="">
                    <p className='text-lg font-bold'>
                        {data.user?.user_metadata.full_name}
                    </p>
                    <p>
                        {/* TODO: add username as well as fullname */}
                    </p>
                </div>
            </div>
        </>
    )
}
