import { PostType, ResponseType } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: { postId: string } }): Promise<NextResponse<ResponseType<null>>> => {
    const supabase = await createClient();
    const postId = (await params).postId

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

    if(error) {
        return NextResponse.json({ data: null, errorMessage: error.message, status: 500 });
    } else {
        return NextResponse.json({ data: null, errorMessage: null, status: 204 });
    }
}

export const GET = async (req: NextRequest, { params }: { params: { postId: string }}): Promise<NextResponse<ResponseType<PostType>>> => {
    const supabase = await createClient();

    const postId = (await params).postId;

    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)

    const { data: comments, error: commentsError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)

    if(error || commentsError || posts.length > 1) {
        return NextResponse.json({ data: null, errorMessage: error ? error.message : 'Server error', status: 500 });
    } else {
        const postData: PostType = {
            ...posts[0],
            comments,
        }
        return NextResponse.json({ data: postData, errorMessage: null, status: 204 });
    }

}