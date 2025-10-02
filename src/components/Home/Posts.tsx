'use client'

import { PostType } from "@/types"
import { supabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";

type PropsType = {
    serverPosts: PostType[],
}

//we couldnt use createClient for supabase because 
//we cant use async/await in return of useEffect hook
//but we need to unsubscribe from updates on UnMount

export const Posts: React.FC<PropsType> = ({serverPosts}) => {
    const [posts, setPosts] = useState<PostType[]>(serverPosts);

    console.log('current posts', posts);

    useEffect(() => {
        const myChannel = supabaseClient
            .channel('posts')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, payload => {
                const newPost = payload.new as PostType;

                setPosts((currentPosts) => [newPost, ...currentPosts]);
            })
            .subscribe()

        return () => {
            supabaseClient.removeChannel(myChannel)
        }
    }, [])

    return (
        <div className="flex flex-col space-y-2 px-2">
            {posts.map(postData => (
                <Post data={postData} key={postData.id} />
            ))}
        </div>
    )
}
