import { axiosInstance } from "@/utils/axiosInstance";
import { Post } from "./Post";
import { Posts } from "./Posts";
import { createClient } from "@/utils/supabase/server";
import { PostType, ResponseType } from "@/types";

type PropsType = {}

export const Stream: React.FC<PropsType> = async ({}) => {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    const res = await axiosInstance.get<ResponseType<PostType[]>>('/posts');

    const posts = res.data;

    //TODO: handle error
    if(posts.errorMessage) {
        throw new Error(posts.errorMessage);
    }

    return (
        <div>
            {posts.data && 
                <Posts serverPosts={posts.data} authUid={user?.id} />
            }
        </div>
    )
}
