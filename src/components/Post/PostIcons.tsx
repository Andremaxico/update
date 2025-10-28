'use client';

import { toggleLikeAction } from '@/actions/posts';
import { commentPopupState, postIdState } from '@/atom/commentPopupStateAtom';
import { axiosInstance } from '@/utils/axiosInstance';
import { useAtomState } from '@zedux/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import { useRecoilState } from 'recoil';

type PropsType = {
    authUid: string | undefined,
    postId: string,
    userId: string,
    likes: string[],
    commentsCount: number,
};

export const PostIcons: React.FC<PropsType> = ({ postId, userId, likes, authUid, commentsCount }) => {
    const [isPending, startTransition] = useTransition();

    const [ isCommentPopupOpen, setIsCommentPopupOpen ] = useAtomState(commentPopupState);
    const [ postIdAtomState, setPostIdAtomState ] = useAtomState(postIdState);

    const router = useRouter(); 

    const [currLikes, setCurrLikes] = useState<string[]>([...likes])
    const [isLiked, setIsLiked] = useState<boolean>(likes.includes(userId));

    console.log('is liked', isLiked, currLikes, likes)


    const handleLike = async () => {
        //we do this shit to show user his like/unlike immediately
        const oldLikedStatus = isLiked;

        const newCurrLikes = isLiked ? currLikes.filter(id => id !== userId) : [...currLikes, userId];
        setCurrLikes(newCurrLikes)
        setIsLiked(!oldLikedStatus)

        console.log('likes changed');

        startTransition(async () => {
            const errorMessage = await toggleLikeAction(postId, userId, oldLikedStatus, currLikes);

            console.log('error message', errorMessage)

            //dont know why, but if no errorMessage likes return to the start status
            //I believe it's because of defaultValues in useStates
            if(!errorMessage) {
                setCurrLikes(newCurrLikes);
                setIsLiked(!oldLikedStatus);
            } else {
                toast.error('Could not execute');
            }
        })
    }

    const handleDelete = async () => {
        if(userId === authUid) {
            const res = await axiosInstance.delete(`/posts/${postId}`);

            const errorMessage = res.data;

            if(errorMessage) {
                //TODO: 
                //handle error
            } else {
                //TODO:
                //show success
            }
        }
    }

    const openCommentPopup = () => {
        if(authUid) {
            setIsCommentPopupOpen(true);
            setPostIdAtomState(postId)
        } else {
            router.push('/signin')
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <div className="flex items-center group">
                    <button 
                        className="w-8 h-8 flex items-center justify-center hover:bg-blue-50 hover:text-blue-400 duration-75 rounded-full cursor-pointer"
                        onClick={openCommentPopup}
                    >
                        <IoChatbubbleEllipsesOutline className={`size-5`} />
                    </button>
                    {commentsCount > 0 &&
                        <p className=''>{commentsCount}</p>
                    }
                </div>
                <div className="flex items-center">
                    <button 
                        className="group w-8 h-8 flex items-center justify-center hover:bg-red-50 hover:text-red-400 duration-75 rounded-full cursor-pointer"
                        onClick={handleLike}
                        disabled={isPending}
                    >
                        {isLiked ? 
                            <IoMdHeart className="text-red-400 size-5" />
                        :
                            <IoMdHeartEmpty className="size-5" />
                        } 
                    </button>
                    <p className={`${isLiked ? 'text-red-400' : 'text-black'} text-sm`}>
                        { currLikes.length > 0 ? currLikes.length : '' }
                    </p>
                </div>
            </div>
            { authUid === userId &&
                <button 
                    className="group w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-400 duration-75 rounded-full cursor-pointer"
                    onClick={handleDelete}
                >
                    <HiOutlineTrash className="size-5" />
                </button>
            }
        </div>
    )
}
