import { PostType, ResponseType } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type DataType = PostType

export const POST = async ( req: NextRequest ): Promise<NextResponse<ResponseType<DataType>>> => {
    const supabase = await createClient();

    const formData = await req.formData();

    const postData: Omit<PostType, 'created_at' | 'id'> = {
        avatar_url: formData.get('avatarUrl') as string, 
        image_url: (formData.get('imageUrl') || null) as string | null,
        username: formData.get('username') as string,
        text: formData.get('postText') as string,
        user_id: formData.get('userId') as string,
        likes: [] as string[],
    }

    const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()

    console.log('data after uploading post', data);

    if(error) {
        return NextResponse.json({data: null, status: 500, errorMessage: error.message})
    } else {
        const postData = data[0] as unknown as DataType

        return NextResponse.json({data: postData, status: 200, errorMessage: null})
    }
}

export const GET = async (req: NextRequest): Promise<NextResponse<ResponseType<DataType[]>>> => {
    const supabase = await createClient();

    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', {ascending: false})
        .limit(10)

    console.log('data from db', posts);

    if(error) {
        return NextResponse.json({data: null, status: 500, errorMessage: error.message})
    } else {
        const postsData = posts as DataType[]

        return NextResponse.json({data: postsData, status: 200, errorMessage: null})
    }
}