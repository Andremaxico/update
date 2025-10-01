'use client'

import { PostType } from "@/types"
import { supabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type PropsType = {
    serverPosts: PostType[],
}

//we couldnt use createClient for supabase because 
//we cant use async/await in return of useEffect hook
//but we need to unsubscribe from updates on UnMount

export const Posts: React.FC<PropsType> = ({serverPosts}) => {
    const [posts, setPosts] = useState<PostType[]>(serverPosts);

    useEffect(() => {
        const channel = supabaseClient
            .channel('room1')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'countries' }, payload => {
                console.log('Change received!', payload)
            })
            .subscribe()

        

        return () => {
            supabaseClient.removeChannel(channel)
        }
    }, [supabaseClient])

    return (
        <div>Posts</div>
    )
}
