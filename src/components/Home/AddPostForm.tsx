'use client'

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { AiOutlinePicture } from "react-icons/ai";

type PropsType = {}

export const AddPostForm: React.FC<PropsType> = ({}) => {
    const [isPending, startTransition] = useTransition();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string |  null>(null);
    
    console.log('url', selectedImageUrl)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if(files && files[0]) {
            console.log('file', files[0])
            setSelectedFile(files[0]);

            setSelectedImageUrl(URL.createObjectURL(files[0]))
        }
    }

    return (
        // TODO
        //add validation
        <form className="w-full">
            <textarea
                className="p-1 mb-2 w-full border-b-1 border-b-gray-400 outline-none resize-none"
                rows={2}
                placeholder="How it's going?"
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
                    <button className="
                        absolute top-2 right-2 
                        w-8 h-8 flex items-center justify-center 
                        text-white rounded-md bg-black opacity-80
                        hover:opacity-100 duration-50
                        cursor-pointer z-2
                    ">
                        X
                    </button>
                </div>
            }
            <div className="flex justify-between items-center">
                <label className="cursor-pointer">
                    <input type='file' className="hidden" onChange={handleFileChange} accept="image/*"/>
                    <div className="p-2 rounded-full hover:bg-blue-100 duration-50">
                        <AiOutlinePicture className="size-5 text-blue-400" />
                    </div>
                </label>
                <button
                    className='text-white bg-blue-400 font-bold py-2 px-10 rounded-full cursor-pointer hover:brightness-90 disabled:brightness-125 duration-100'
                >
                    Post
                </button>
            </div>
        </form>
    )
}
