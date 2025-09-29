import { createClient } from "@/utils/supabase/server"
import { User } from "@supabase/supabase-js"
import Image from "next/image"
import { AddPostForm } from "./AddPostForm"

type PropsType = {
    user: User,
}

export const AddPost: React.FC<PropsType> = async ({user}) => {
    const { user_metadata } = user;

    return (
        <div className="p-2 w-full flex items-start space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image 
                    alt="Avatar url"
                    src={user_metadata.avatar_url}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                />
            </div>
            <AddPostForm user={user} />
        </div>
    )
}
