'use client'

import { createClient } from "@/app/utils/supabase/client"

type PropsType = {}

export const SignOutButton: React.FC<PropsType> = ({}) => {
    const supabase = createClient();

    const signout = async () => {
        const { error } = await supabase.auth.signOut();

        //TODO:
        //handle error
    }

    return (
        <button 
            onClick={signout}
            className=' mb-2 text-white bg-blue-400 font-semibold text-lg py-2 px-10 rounded-full cursor-pointer hover:brightness-90 duration-100'
        >
            Вийти
        </button>
    )
}
