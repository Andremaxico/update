import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export const POST = async ( req: NextRequest ) => {
    const supabase = await createClient();

    const formData = await req.formData();

    const { data, error } = await supabase
        .from('posts')
        .insert([
            { 
                avatar_url: formData.get('avatarUrl'), 
                image_url: 'to be done',
                username: formData.get('username'),
                text: formData.get('text')
            },
        ])
        .select()
}