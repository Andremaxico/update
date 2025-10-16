import { ResponseType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { postId: string } }): Promise<NextResponse<ResponseType<any>>> => {
    const data = req.formData;

    //TODO:
    //load data

    const error = {
        errorMessage: 'message',
    };


    if(error) {
        return NextResponse.json({ data: null, errorMessage: error.errorMessage, status: 500 })
    } else {
        return NextResponse.json({ data: {}, errorMessage: null, status: 201 })
    }
}