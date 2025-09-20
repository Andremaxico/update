import { axiosInstance } from '@/app/utils/axiosInstance'
import React from 'react'
import { NewsService } from './NewsService';
import axios from 'axios';

type PropsType = {}

export const News: React.FC<PropsType> = async ({}) => {
    const response = await fetch('http://localhost:3000/api/news');

    const data = await response.json();

    console.log('response', data);

    const news = data.data;

    return (
        <div className='p-2 rounded-md bg-gray-100'>
            <h4 className='mb-2 text-lg font-bold'>Whats happening</h4>
            {news ?
                <NewsService news={news} />
            : 
                // TODO: style it
                <p>error</p>
            }
        </div>
    )
}
