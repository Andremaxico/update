'use client'

import React, { useState } from 'react'
import { NewsRenderer } from './NewsRenderer';
import { NewsType } from '@/app/types';

type PropsType = {
    news: NewsType,
}

export const NewsService: React.FC<PropsType> = ({news}) => {
    const [articlesCount, setArticlesCount] = useState<number>(3);

    const articles = news.articles.slice(0, articlesCount); 

    const handleClick = () => {
        setArticlesCount((articlesCount) => articlesCount + 3);
    }

    return (
        <div className='flex flex-col items-center'>
            <div className="w-full">
                <NewsRenderer articles={articles} />
            </div>
            <button className='text-blue-400 ' onClick={handleClick}>
                Load more
            </button>
        </div>
    )
}
