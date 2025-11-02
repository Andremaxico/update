import { PostType, ResponseType } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

//we cannot provide required params in DELETE method
//so we handle toggling likes in PUT method

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ postId: string }> }): Promise<NextResponse<ResponseType<PostType>>> => {
    const supabase = await createClient();

    const userId = req.nextUrl.searchParams.get('userId');
    const isLiked = req.nextUrl.searchParams.get('isLiked')
    const postId = (await params).postId;

    console.log('is liked', isLiked, 'postId', postId, 'userid')

    const body = await req.json();

    const currLikes = body.currLikes;

    console.log('curr likes', currLikes)

    const newLikes = isLiked === 'true' ?
        currLikes.filter((id: string) => id !== userId)
    :
        [...currLikes, userId]


    console.log('new like', newLikes);

    const { data, error } = await supabase
        .from('posts')
        .update({ likes: newLikes })
        .eq('id', postId)
        .select()

    console.log('data', data, 'error', error)

    if( error ) {
        return NextResponse.json({data: null, errorMessage: error.message, status: 500})
    } else {
        const postData = data[0] as unknown as PostType

        return NextResponse.json({data: postData, errorMessage: null, status: 201})
    }
}