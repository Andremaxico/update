'use client'

import { sendPostAction } from "@/actions/posts";
import { axiosInstance } from "@/utils/axiosInstance";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { AiOutlinePicture } from "react-icons/ai";

type PropsType = {
    user: User,
}

export const AddPostForm: React.FC<PropsType> = ({user}) => {
    const [isPending, startTransition] = useTransition();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [text, setText] = useState<string | undefined>(undefined);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string |  null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            try {
                const data = new FormData(e.currentTarget);

                data.append('avatar_url', user.user_metadata.avatar_url)
                data.append('username', user.user_metadata.full_name)
                if(selectedFile) {
                    data.append('imageFile', selectedFile)
                }
                data.append('user_id', user.id)
                
                const { errorMessage } = await sendPostAction(data);

                if(errorMessage) {
                    throw new Error(errorMessage)
                }

                setSelectedImageUrl(null);
                setSelectedFile(null);
                setText('');
            } catch(e) {
                console.log('something went wrong', e)
            }
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if(files && files[0]) {
            setSelectedFile(files[0]);
            setSelectedImageUrl(URL.createObjectURL(files[0]))
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const deleteImage = () => {
        setSelectedFile(null);
        setSelectedImageUrl(null);
    }

    return (
        // TODO
        //add validation
        <form 
            className="w-full"
            onSubmit={handleSubmit}
        >
            <textarea
                className="p-1 mb-2 w-full border-b-1 border-b-gray-400 outline-none resize-none"
                rows={2}
                onChange={handleTextChange}
                value={text}
                placeholder="How it's going?"
                name="postText"
            />
            {selectedImageUrl &&
                <div className="mb-2 max-h-80 overflow-hidden relative w-full">
                    <Image 
                        src={selectedImageUrl}
                        width={300}
                        height={300}
                        alt="selected image"
                        className="w-full h-full object-cover"
                    />
                    <button 
                        className="
                            absolute top-2 right-2 
                            w-8 h-8 flex items-center justify-center 
                            text-white rounded-md bg-black opacity-80
                            hover:opacity-100 duration-50
                            cursor-pointer z-2
                        "
                        onClick={deleteImage}
                        
                    >
                        X
                    </button>
                </div>
            }
            <div className="flex justify-between items-center">
                <label className="cursor-pointer">
                    <input 
                        type='file'
                        className="hidden" 
                        onChange={handleFileChange}
                        accept="image/*"
                        name="postImage"
                    />
                    <div className="p-2 rounded-full hover:bg-blue-100 duration-50">
                        <AiOutlinePicture className="size-5 text-blue-400" />
                    </div>
                </label>
                {!isPending ?
                    <button
                        disabled={text?.trim().length === 0}
                        className='text-white bg-blue-400 font-bold py-2 px-10 rounded-full cursor-pointer hover:brightness-90 disabled:brightness-125 duration-100'
                    >
                        Post
                    </button>
                :
                    <p>Loading</p>
                }
            </div>
        </form>
    )
}
