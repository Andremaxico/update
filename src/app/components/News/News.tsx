import { axiosInstance } from '@/app/utils/axiosInstance'
import React from 'react'
import { NewsService } from './NewsService';

type PropsType = {}

export const News: React.FC<PropsType> = async ({}) => {
    const response = await axiosInstance.get('/news');

    console.log('response', response.data);

    const news = response.data.data;

    return (
        <div>
            <h4 className='mb-2 text-lg font-bold'>Whats happening</h4>
            {news ?
                <NewsService news={news} />
            : 
                // TODO: style it
                <p>{response.data.message}</p>
            }
            

        </div>
    )
}
