import { v4 as uuidv4 } from 'uuid'
import { NextRequest, NextResponse } from "next/server";
import { ResponseType } from '@/types';
import { createClient } from '@/utils/supabase/server';

export const POST = async (req: NextRequest): Promise<NextResponse<ResponseType<any>>> => {
    const supabase = await createClient();

    const formData  = await req.formData();
    const file = formData.get('imageFile') as File;

    const fileId = uuidv4();

    const { data, error } = await supabase.storage.from('posts').upload(`images/${fileId}`, file)

    console.log('data', data);

    if (error) {
        return NextResponse.json({ data: null, status: 500, errorMessage: error.message })
    } else {
        return NextResponse.json({ data, status: 200, errorMessage: null })
    }

}