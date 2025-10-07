'use client'

import { PostType } from "@/types"
import { supabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { useRouter } from "next/navigation";

type PropsType = {
    serverPosts: PostType[],
    authUid: string | undefined,
}

//we couldnt use createClient for supabase because 
//we cant use async/await in return of useEffect hook
//but we need to unsubscribe from updates on UnMount

export const Posts: React.FC<PropsType> = ({ serverPosts, authUid }) => {
    const router = useRouter();
    const [posts, setPosts] = useState<PostType[]>(serverPosts);

    console.log('current posts', posts);

    useEffect(() => {
        const insertChannel = supabaseClient
            .channel('posts_insert')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, payload => {
                const newPost = payload.new as PostType;

                setPosts((currentPosts) => [newPost, ...currentPosts]);
            })
            .subscribe()

        const deleteChannel = supabaseClient
            .channel('posts_delete')
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'posts' }, payload => {
                console.log('got delete');
                window.location.reload();
            })
            .subscribe()

        return () => {
            supabaseClient.removeChannel(insertChannel)
            supabaseClient.removeChannel(deleteChannel)
        }
    }, [])

    return (
        <div className="flex flex-col space-y-2 px-2">
            {posts.map(postData => (
                <Post data={postData} key={postData.id} authUid={authUid} />
            ))}
        </div>
    )
}
