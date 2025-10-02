import { PostType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { BiDotsHorizontal } from "react-icons/bi"

type PropsType = {
    data: PostType,
}

export const Post: React.FC<PropsType> = ({data}) => {
    const { image_url, avatar_url, created_at, text, username, id } = data

    //TODO;
    //show post date
    const date = new Date(created_at.slice(10));

    // console.log('date', date);

    return (
        <Link href={`/posts/${id}`} className="pb-2 border-b border-gray-300">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2 pl-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                            width={60}
                            height={60}
                            alt="user_avatar"
                            src={avatar_url}
                            className="w-full h-full object-cover"
                        />
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
            <div className="mb-2">
                <p>
                    {text}
                </p>
            </div>
            { image_url &&
                <div className="w-full max-h-60 rounded-md overflow-hidden">
                    <Image
                        alt="post_image"
                        width={500}
                        height={300}
                        src={image_url}
                        className="w-full h-full object-cover"
                    />
                </div>
            }
            <div className="">

            </div>
        </Link>
    )
}
