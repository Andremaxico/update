import { ResponseType } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: { postId: string } }): Promise<NextResponse<ResponseType<any>>> => {
    const supabase = await createClient();

    const postId = (await params).postId;

    const body = await req.json()

    const currCommentsCount = body.currCommentsCount;

    const { error } = await supabase
        .from('posts')
        .update({ commentsCount: currCommentsCount + 1 })
        .eq('id', postId)
        .select()

    if(error) {
        return NextResponse.json({ data: null, errorMessage: error.message, status: 500 })
    } else {
        return NextResponse.json({data: null, errorMessage: null, status: 201})
    }
}