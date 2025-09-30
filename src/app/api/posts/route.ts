import { ResponseType } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type DataType = any

export const POST = async ( req: NextRequest ): Promise<NextResponse<ResponseType<DataType>>> => {
    const supabase = await createClient();

    const formData = await req.formData();


    const { data, error } = await supabase
        .from('posts')
        .insert([
            { 
                avatar_url: formData.get('avatarUrl'), 
                image_url: formData.get('imageUrl'),
                username: formData.get('username'),
                text: formData.get('postText')
            },
        ])
        .select()

    console.log('data after uploading post', data);

    if(error) {
        return NextResponse.json({data: null, status: 500, errorMessage: error.message})
    } else {
        return NextResponse.json({data, status: 200, errorMessage: null})
    }
}