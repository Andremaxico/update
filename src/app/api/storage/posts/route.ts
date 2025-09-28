import { v4 as uuidv4 } from 'uuid'
import { supabase } from "@/utils/supabase/supabase";
import { NextRequest, NextResponse } from "next/server";
import { ResponseType } from '@/types';

export const POST = async (req: NextRequest): Promise<NextResponse<ResponseType<any>>> => {
    const formData  = await req.formData();
    const file = formData.get('file') as File;

    const fileId = uuidv4();

    const { data, error } = await supabase.storage.from('posts').upload(`images/${fileId}`, file)
    if (error) {
        return NextResponse.json({ data: null, status: 500, errorMessage: error })
    } else {
        return NextResponse.json({ data, status: 200, errorMessage: null })
    }

}