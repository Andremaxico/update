'use client'


import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Provider } from "@supabase/supabase-js";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { authWithOAuthAction } from "@/actions/auth";

type PropsType = object;

export const SocialAuth: React.FC<PropsType> = ({}) => {
    const router = useRouter();
    const [ isPending, startTransition ] = useTransition();

    const handleSocialAuth = async (provider: Provider) => {
        startTransition(async () => {
            const { errorMessage, url } = await authWithOAuthAction(provider);

            if(!errorMessage && url) {
                console.log('push router');
                router.push(url);
            } else {
                //TODO:
                //set a toaster here
                console.error(errorMessage);
            }
            console.log('error message', errorMessage, 'url', url);
        })
    }

    return (
        <div className="flex flex-col items-center">
            <h3 className="mb-2">Вхід за допомогою</h3>
            <div className="flex gap-2">
                <button 
                    className="w-12 h-12 flex items-center justify-center border-1 border-gray-300 rounded-md cursor-pointer group"
                    onClick={() => handleSocialAuth('github')}
                    disabled={isPending}
                >
                    <FaGithub className="size-5 hover:scale-120 duration-75" />
                </button>
                <button 
                    className="w-12 h-12 flex items-center justify-center border-1 border-gray-300 rounded-md cursor-pointer group"
                    onClick={() => handleSocialAuth('google')}
                    disabled={isPending}
                >
                    <FaGoogle className="size-5 hover:scale-120 duration-75" />
                </button>
                <button 
                    className="w-12 h-12 flex items-center justify-center border-1 border-gray-300 rounded-md cursor-pointer group"
                    onClick={() => handleSocialAuth('twitter')}
                    disabled={isPending}
                >
                    <BsTwitterX className="size-5 hover:scale-120 duration-75" />
                </button>
            </div>
        </div>
    )
}
