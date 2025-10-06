import { ResponseType } from "@/types";
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

        console.log('deleted psot')
        return NextResponse.json({ data: null, errorMessage: null, status: 204 });
    }
}