import { BasicResponse, NewsType } from "@/app/types";
import { axiosInstance } from "@/app/utils/axiosInstance";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse<BasicResponse<NewsType>>> => {
    const res = await axios.get('https://saurav.tech/NewsAPI/top-headlines/category/health/us.json');

    const newsData = res.data as NewsType;

    if(res.status < 300) {
        return NextResponse.json({data: newsData, error: null, message: "Success", status: res.status})
    } else {
        return NextResponse.json({data: null, error: res.statusText, message: "Something went wrong", status: res.status})
    }
}