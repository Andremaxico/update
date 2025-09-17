import { createClient } from '@/app/utils/supabase/server';
import React from 'react'
import { LoginButton } from './LoginButton';

type PropsType = {};

export const MiniProfile: React.FC<PropsType> = async ({}) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()

    console.log('data', data);

    return (
        <div>
            
            
        </div>
    )
}
