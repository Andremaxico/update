import { ResponseType } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type DataType = {
    avatar_url: string,
    image_url: string | null,
    username: string,
    text: string,
    user_id: string,
    id: string,
}

export const POST = async ( req: NextRequest ): Promise<NextResponse<ResponseType<DataType>>> => {
    const supabase = await createClient();

    const formData = await req.formData();


    const { data, error } = await supabase
        .from('posts')
        .insert([
            { 
                avatar_url: formData.get('avatarUrl'), 
                image_url: formData.get('imageUrl') ?? null,
                username: formData.get('username'),
                text: formData.get('postText'),
                user_id: formData.get('userId')
            },
        ])
        .select()

    console.log('data after uploading post', data);

    if(error) {
        return NextResponse.json({data: null, status: 500, errorMessage: error.message})
    } else {
        const postData = data as unknown as DataType

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