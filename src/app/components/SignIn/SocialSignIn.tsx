'use client'


import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { createClient } from "@/app/utils/supabase/client";

type PropsType = {};

export const SocialSignIn: React.FC<PropsType> = ({}) => {

    const signInWithTwitter = async () => {
        const supabase = createClient();

        await supabase.auth.signInWithOAuth({
            'provider': 'twitter',
            options: {
                // TODO: change this to handle dev and prod mode
                redirectTo: `http://localhost:3000/auth/callback`,
            },
        })
    }

    const signInWithGoogle = async () => {
        const supabase = createClient();

        await supabase.auth.signInWithOAuth({
            'provider': 'google',
            options: {
                // TODO: change this to handle dev and prod mode
                redirectTo: `https://oghkmzxchzuryswavhjk.supabase.co/auth/v1/callback`,
            },
        })
    }

    const signInWithGithub = async () => {
        const supabase = createClient();

        await supabase.auth.signInWithOAuth({
            'provider': 'github',
            options: {
                // TODO: change this to handle dev and prod mode
                redirectTo: `http://localhost:3000/auth/callback`,
            },
        })
    }

    return (
        <div className="flex flex-col items-center">
            <h3 className="mb-2">Вхід за допомогою</h3>
            <div className="flex gap-2">
                <button 
                    className="w-12 h-12 flex items-center justify-center border-1 border-gray-300 rounded-md cursor-pointer group"
                    onClick={signInWithGithub}
                >
                    <FaGithub className="size-5 hover:scale-120 duration-75" />
                </button>
                <button 
                    className="w-12 h-12 flex items-center justify-center border-1 border-gray-300 rounded-md cursor-pointer group"
                    onClick={signInWithGoogle}
                >
                    <FaGoogle className="size-5 hover:scale-120 duration-75" />
                </button>
                <button 
                    className="w-12 h-12 flex items-center justify-center border-1 border-gray-300 rounded-md cursor-pointer group"
                    onClick={signInWithTwitter}
                >
                    <BsTwitterX className="size-5 hover:scale-120 duration-75" />
                </button>
            </div>
        </div>
    )
}
