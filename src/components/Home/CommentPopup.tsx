'use client'

import { commentPopupState, postIdState } from "@/atom/commentPopupStateAtom"
import { useAtomState } from "@zedux/react"
import ReactModal from "react-modal"
import { useRecoilState } from "recoil"
import { HiX } from "react-icons/hi";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react"
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

    const originAvatarRef = useRef<HTMLDivElement>(null);
    const commentAvatarRef = useRef<HTMLDivElement>(null);

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

    //set height of decoative line
    useEffect(() => {
        if(commentAvatarRef.current && originAvatarRef.current) {
            const commentTop = commentAvatarRef.current.offsetTop;
            const originTop = originAvatarRef.current.offsetTop;

            console.log('avatar tops', commentTop, originTop);

            setAvatarsDistance(commentTop-originTop);
        }
    }, [commentAvatarRef.current, originAvatarRef.current]);

    console.log('avatars distance', avatarsDistance);

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

                        <div className="mb-2 flex flex-col pl-8">
                            <div className="flex mb-2">
                                <div
                                    ref={originAvatarRef} 
                                    className={`
                                        relative mr-2 w-12 h-12 flex items-center justify-center rounded-full overflow-hidden
                                        before:content-[''] before:h-[${avatarsDistance || 40}px] before:w-[1px] before:bg-gray-500
                                        before:left-1/2 before:translate-x-[-50%] before:top-[calc(100% - 1px)] before:z-[-1]
                                        `}
                                >
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
                                <div 
                                    ref={commentAvatarRef}
                                    className={`
                                        relative mr-2 w-12 h-12 flex items-center justify-center rounded-full overflow-hidden
                                    `}
                                >
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
                            <form className="flex flex-col items-end pr-2 pb-2">
                                <div className="w-full pl-14">
                                    <textarea
                                        value={commentText}
                                        rows={3}
                                        onChange={handleChange}
                                        placeholder="What do you think?"
                                        name="commentText"
                                        className="
                                            w-full
                                            text-sm
                                            border-b-1 border-gray-300
                                            resize-none outline-0
                                            placeholder:font-bold focus:border-gray-600
                                            duration-50
                                        "
                                    />
                                </div>
                                <button
                                    disabled={commentText.trim().length < 1}
                                    className='text-white bg-blue-400 text-sm py-2 px-10 rounded-full cursor-pointer hover:brightness-90 disabled:brightness-125 duration-100'
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
