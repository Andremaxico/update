'use client'

import { AiOutlinePicture } from "react-icons/ai";

type PropsType = {}

export const AddPostForm: React.FC<PropsType> = ({}) => {
    return (
        // TODO
        //add validation
        <form className="w-full">
            <textarea
                className="p-1 mb-2 w-full border-b-1 border-b-gray-400 outline-none resize-none"
                rows={2}
                placeholder="How it's going?"
            />
            <div className="flex justify-between items-center">
                <div className="">
                    <AiOutlinePicture className="size-5 text-blue-400 hover:brightness-125 duration-50" />
                </div>
                <button
                    className='text-white bg-blue-400 font-bold py-2 px-10 rounded-full cursor-pointer hover:brightness-90 disabled:brightness-125 duration-100'
                >
                    Post
                </button>
            </div>
        </form>
    )
}
