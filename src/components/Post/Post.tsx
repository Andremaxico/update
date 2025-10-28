import { PostType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { BiDotsHorizontal } from "react-icons/bi"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi2";
import { PostIcons } from "./PostIcons";
import { createClient } from "@/utils/supabase/server";

type PropsType = {
    data: PostType,
    authUid: string | undefined,
}

export const Post: React.FC<PropsType> = ({ data, authUid }) => {

    const { image_url, avatar_url, created_at, text, username, id, user_id, likes, commentsCount } = data

    //TODO;
    //show post date
    const date = new Date(created_at.slice(10));

    console.log('diffennt data', likes);

    return (
        <div className="pb-2 border-b border-gray-300">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2 pl-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        {avatar_url &&
                            <Image
                                width={60}
                                height={60}
                                alt="user_avatar"
                                src={avatar_url}
                                className="w-full h-full object-cover"
                            />
                        }
                        {/* TODO: show something if there is not an avatar url */}
                    </div>
                    <div className="">
                        <p className="text-lg font-bold">
                            {username}
                        </p>
                    </div>
                </div>
                <button className="cursor-pointer">
                    <BiDotsHorizontal className="size-5 text-gray-300" />
                </button>
            </div>
            <Link href={`/posts/${id}`} className="mb-2">
                <p>
                    {text}
                </p>
            </Link>
            { image_url &&
                <div className="w-full max-h-60 rounded-md overflow-hidden mb-2">
                    <Image
                        alt="post_image"
                        width={500}
                        height={300}
                        src={image_url}
                        className="w-full h-full object-cover"
                    />
                </div>
            }
            <PostIcons commentsCount={commentsCount} likes={likes} postId={id} userId={user_id} authUid={authUid} />
        </div>
    )
}
