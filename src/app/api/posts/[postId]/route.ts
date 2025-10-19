import { PostType, ResponseType } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";
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

    if(error || posts.length > 1) {
        return NextResponse.json({ data: null, errorMessage: error ? error.message : 'Server error', status: 500 });
    } else {
        return NextResponse.json({ data: posts[0], errorMessage: null, status: 204 });
    }

}