'use client';

import React, { useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

type PropsType = {
    formAction: (data: FormData) => void,
};

export const SignInForm: React.FC<PropsType> = ({formAction}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <form className='flex flex-col items-center pr-4 w-full'>
            <label className='mb-3 w-full cursor-pointer'>
                <p className='mb-1 text-sm italic'>Введіть Вашу електронну адресу</p>
                <input 
                    name='email'
                    type='email'
                    required
                    placeholder='Електронна адреса'
                    className='
                        w-full
                        py-2 px-4
                        text-sm
                        rounded-md
                        bg-gray-50
                        border-1 border-gray-200
                        hover:shadow:md
                        focus:border-black active:border-black active:border-2 focus-visible:outline-0
                        duration-75
                        outline-
                        cursor-pointer
                    '
                />
            </label>

            <label className='mb-4 w-full cursor-pointer'>
                <p className='mb-1 text-sm italic'>Введіть Ваш пароль</p>
                <div className="flex relative">
                    <input 
                        // TODO:
                        //ad validation
                        name='password'
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder='Пароль'
                        required
                        className='
                            w-full
                            py-2 px-4
                            text-sm
                            rounded-md
                            bg-gray-50
                            border-1 border-gray-200
                            hover:shadow:md
                            focus:border-black active:border-black active:border-2 focus-visible:outline-0
                            duration-75
                            outline-
                            cursor-pointer
                        '
                    />
                    <button 
                        className='absolute top-1/2 right-0 translate-x-[150%] translate-y-[-50%] cursor-pointer'
                        onClick={togglePasswordVisibility}
                    >
                        {isPasswordVisible ?
                            <IoEyeOffOutline />
                        :
                            <IoEyeOutline />
                        }
                    </button>
                </div>
            </label>

            <button 
                formAction={formAction}
                className='text-white bg-blue-400 text-sm py-2 px-10 rounded-full cursor-pointer translate-x-4 hover:brightness-90 duration-100'
            >
                Увійти
            </button>
        </form>
    )
}
