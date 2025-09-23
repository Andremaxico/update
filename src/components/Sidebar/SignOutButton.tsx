'use client'

import { signOutAction } from "@/actions/auth";
import { useTransition } from "react"


type PropsType = {}

export const SignOutButton: React.FC<PropsType> = ({}) => {
    const [isPending, startTransition] = useTransition();

    const signout = async () => {
        startTransition(async () => {
            const errorMessage = await signOutAction();
            
            //TODO:
            //handle error  
            if ( errorMessage ) {
                console.error('error message', errorMessage);
            }
        })
    }

    return (
        <button 
            disabled={isPending}
            onClick={signout}
            className=' mb-2 text-white bg-blue-400 font-semibold text-lg py-2 px-10 rounded-full cursor-pointer hover:brightness-90 duration-100'
        >
            {isPending ? 'loading...' : 'Вийти'}
        </button>
    )
}
