'use client'

import { commentPopupState, postIdState } from "@/atom/commentPopupStateAtom"
import { useAtomState } from "@zedux/react"
import ReactModal from "react-modal"
import { useRecoilState } from "recoil"
import { HiX } from "react-icons/hi";
import { ChangeEvent, useEffect, useState, useTransition } from "react"
import { PostType } from "@/types"
import { axiosInstance } from "@/utils/axiosInstance"
import { getPostAction } from "@/actions/posts"
import Image from "next/image"
import { supabaseClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { getUserAction } from "@/actions/auth"

export const CommentPopup = ({}) => {
    const [ isPending, startTransition ] = useTransition();

    const [ isOpen, setIsOpen ] = useAtomState(commentPopupState);
    const [ postId, setPostId ] = useAtomState(postIdState)
    
    const [originPost, setOriginPost] = useState<PostType | null>(null);
    const [avatarsDistance, setAvatarsDistance] = useState<number | undefined>(undefined);
    const [userData, setUserData] = useState<User | null>(null);
    const [commentText, setCommentText] = useState<string>('');

    const closePopup = () => {
        setIsOpen(false);
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        setCommentText(value);
    }

    //get user and post data because it is necessary to show add post ui
    useEffect(() => {
        if(postId) {
            startTransition(async () => {
                const postData = await getPostAction(postId);   
                const userData = await getUserAction();

                console.log('user data', userData, 'post data', postData);

                setOriginPost(postData);
                setUserData(userData);
            })
        }
    }, [postId])

    return (
        <ReactModal 
            isOpen={isOpen}
            onRequestClose={closePopup}
            ariaHideApp={false}
            className='absolute left-1/2 top-1/2 w-full max-w-xl translate-x-[-50%] translate-y-[-50%]'
        >
            <div className="p-2 bg-white rounded-md shadow-md">
                {isPending ? 
                    <p>loading</p>
                : originPost && userData ?
                    <>
                        <button 
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer"
                            onClick={closePopup}
                        >
                            <HiX className="size-5 text-gray-600" />
                        </button>

                        <div className="flex flex-col pl-8">
                            <div className="flex mb-2">
                                <div className={`
                                    relative mr-2 w-12 h-12 flex items-center justify-center rounded-full overflow-hidden
                                    before:content-[''] before:h-[${avatarsDistance || 40}px] before:w-[1px] before:bg-gray-500
                                    before:left-1/2 before:translate-x-[-50%] before:top-[calc(100% - 1px)] before:z-[-1]
                                `}>
                                    <Image 
                                        alt="user_1_image"
                                        src={originPost.avatar_url ?? ''}
                                        width={50}
                                        height={50}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="">
                                    <p className="font-bold">{originPost.username}</p>
                                </div>
                            </div>
                            <div className="pl-14">
                                <p className="text-sm truncate w-full max-h-20">{originPost.text}</p>
                            </div>
                        </div>

                        <div className="flex flex-col pl-8">
                            <div className="flex mb-2">
                                <div className={`
                                    relative mr-2 w-12 h-12 flex items-center justify-center rounded-full overflow-hidden
                                `}>
                                    <Image 
                                        alt="user_1_image"
                                        src={userData.user_metadata.avatar_url ?? ''}
                                        width={50}
                                        height={50}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="">
                                    <p className="font-bold">{userData.user_metadata.name}</p>
                                </div>
                            </div>
                            <form>
                                <div className="">
                                    <textarea 
                                        defaultValue={commentText}
                                        value={commentText}
                                        onChange={handleChange}
                                        placeholder="What do you think?"
                                        name="commentText"
                                        className="
                                            text-sm text-gray-600
                                            border-b-1 border-gray-600
                                            placeholder:font-bold
                                        "
                                    />
                                </div>
                                <button
                                    className='text-white bg-blue-400 text-sm py-2 px-10 rounded-full cursor-pointer translate-x-4 hover:brightness-90 disabled:brightness-125 duration-100'
                                >
                                    Reply
                                </button>
                            </form>
                        </div>
                    </>   
                :
                    <>Error</>
                }


            </div>
        </ReactModal>
    )
}
