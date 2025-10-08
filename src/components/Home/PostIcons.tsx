'use client';

import { commentPopupState } from '@/atom/commentPopupStateAtom';
import { axiosInstance } from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

type PropsType = {
    authUid: string | undefined,
    postId: string,
    userId: string,
    likes: string[]
};

export const PostIcons: React.FC<PropsType> = ({ postId, userId, likes, authUid }) => {
    const [ isCommentPopupOpen, setIsCommentPopupOpen ] = useRecoilState(commentPopupState);
    const [currLikes, setCurrLikes] = useState<string[]>(likes)
    const [isLiked, setIsLiked] = useState<boolean>(likes.includes(userId));

    const handleLike = async () => {
        const res = await axiosInstance.put(`/posts/${postId}/likes?userId=${userId}&isLiked=${isLiked}`, { currLikes })
        
        console.log('response', res.data);

        const postData = res.data.data;

        if(res.status >= 200 && res.status <= 300) {
            setIsLiked(postData.likes.includes(userId));
            setCurrLikes(postData.likes);
        } else if(res.data.errorMessage) {
            console.log('error', res.data.errorMessage);
        }
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
        setIsCommentPopupOpen(true);
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <button 
                    className="group w-8 h-8 flex items-center justify-center hover:bg-blue-50 hover:text-blue-400 duration-75 rounded-full cursor-pointer"
                    onClick={openCommentPopup}
                >
                    <IoChatbubbleEllipsesOutline className="size-5" />
                </button>
                <div className="flex items-center">
                    <button 
                        className="group w-8 h-8 flex items-center justify-center hover:bg-red-50 hover:text-red-400 duration-75 rounded-full cursor-pointer"
                        onClick={handleLike}
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
