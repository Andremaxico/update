import { createClient } from '@/app/utils/supabase/server';
import React from 'react'
import { LoginButton } from './LoginButton';
import Image from 'next/image';

type PropsType = {};

export const MiniProfile: React.FC<PropsType> = async ({}) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()

    console.log('data', data);

    return (
        <div className='w-full flex items-center justify-between'>
            <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
                <Image 
                    width={90}
                    height={90}
                    src={data.user?.user_metadata.picture || ''}
                    alt='avatar'
                    className='h-full w-full object-cover'
                />
            </div>
            <div className="">
                <p className='text-lg font-bold'>
                    {data.user?.user_metadata.full_name}
                </p>
                <p></p>
            </div>
        </div>
    )
}
