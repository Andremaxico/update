import { CommentPopup } from "@/components/Home/CommentPopup";
import { Comments } from "@/components/Post/Comments";
import { Post } from "@/components/Post/Post";
import { PostPageHeader } from "@/components/Post/PostPageHeader";
import { PostType, ResponseType } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createClient } from "@/utils/supabase/server";

export default async function PostPage({ params }: { params: { postId: string } }) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const postId = params.postId;

    const res = await axiosInstance.get<ResponseType<PostType>>(`/posts/${postId}`);
    const postData = res.data.data;


    //TODO
    //handle error better
    if(!postData) {
        return <p>{res.data.errorMessage}</p>
    }

    return (
        <section className="w-full">
            <PostPageHeader />
            <div className="p-2">
                <Post authUid={user?.id} data={postData} />
            </div>

            <div className="p-2">  
                <h3 className="mb-2 text-lg font-bold">Replies</h3> 
                <Comments postId={postData?.id} />
            </div> 
            <CommentPopup /> 
        </section>
    )
}