import { v4 as uuidv4 } from 'uuid'
import { NextRequest, NextResponse } from "next/server";
import { ResponseType } from '@/types';
import { createClient } from '@/utils/supabase/server';

type UrlDataType = {
    publicUrl: string
}

export const POST = async (req: NextRequest): Promise<NextResponse<ResponseType<UrlDataType>>> => {
    const supabase = await createClient();

    const formData  = await req.formData();
    const file = formData.get('imageFile') as File;

    const fileId = uuidv4();

    const { error } = await supabase.storage.from('posts').upload(`images/${fileId}`, file)

    const { data: urlData } = supabase.storage.from('posts').getPublicUrl(`images/${fileId}`);

    if (error) {
        return NextResponse.json({ data: null, status: 500, errorMessage: error.message })
    } else {
        console.log('return response');
        return NextResponse.json({ data: urlData, status: 200, errorMessage: null })
    }

}