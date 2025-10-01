import { createClient } from "@/utils/supabase/server"
import { AddPost } from "./AddPost"
import { axiosInstance } from "@/utils/axiosInstance"
import { Stream } from "./Stream"

export const Home = async () => {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    return (
        <div className="w-full max-w-2xl">
            <div className="p-2 border-b-1 border-gray-500">
                <h2 className="text-lg font-bold">Home</h2>
            </div>
            {data.user && <AddPost user={data.user} />}
            <div>
                <Stream />
            </div>
        </div>
    )
}
