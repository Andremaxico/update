import { CommentPopup } from "@/components/Home/CommentPopup";
import { Post } from "@/components/Post/Post";
import { PostPageHeader } from "@/components/Post/PostPageHeader";
import { axiosInstance } from "@/utils/axiosInstance";
import { createClient } from "@/utils/supabase/server";

export default async function PostPage({ params }: { params: { postId: string } }) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const postId = params.postId;

    const res = await axiosInstance.get(`/posts/${postId}`);
    const postData = res.data.data;

    return (
        <section className="w-full">
            <PostPageHeader />
            <div className="p-2">
                <Post authUid={user?.id} data={postData} />
            </div>
            <CommentPopup />
        </section>
    )
}