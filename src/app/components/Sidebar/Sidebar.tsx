import Link from 'next/link';
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MiniProfile } from './MiniProfile';
import { Navigation } from './Navigation';
import { createClient } from '@/app/utils/supabase/server';
import { LoginButton } from './LoginButton';

type PropsType = {}

export const Sidebar: React.FC<PropsType> = async ({}) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
 


    return (
        <aside className='sticky top-0 h-[100vh] flex flex-col items-start pr-10 pb-10 border-r-1 border-r-gray-300'>
            <Link href={'/'} className="flex items-center justify-center mb-2 p-4 rounded-full hover:bg-gray-200 duration-100">
                <FaXTwitter className='size-10' />
            </Link>
            <div className="flex-1">
                <Navigation />
            </div>
            {data ? 
                <MiniProfile />
            :
                <LoginButton />
            }
        </aside>
    )
}
