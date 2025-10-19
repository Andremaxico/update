import { PostType, ResponseType } from '@/types';
import { axiosInstance } from '@/utils/axiosInstance';
import React from 'react'
import { Post } from './Post';
import { createClient } from '@/utils/supabase/server';

type PropsType = {
    postId: string
};

export const Comments: React.FC<PropsType> = async ({ postId }) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser(); 

    const res = await axiosInstance.get<ResponseType<PostType[]>>(`/posts/${postId}/comments`);

    const commentsData = res.data.data;

    //TODO:
    //handle error better
    if(res.data.errorMessage && !commentsData) {
        return <p>Error</p>
    }

    return (
        <div className='flex flex-col space-y-2'>
            {commentsData && commentsData.length > 0 ? commentsData.map(data => (
                <Post data={data} authUid={user?.id} key={data.id} />
            ))
            :
                <p className='italic text-center'>No comments</p>
        }
        </div>
    )
}
