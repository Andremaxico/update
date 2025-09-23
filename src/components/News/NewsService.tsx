'use client'

import React, { useEffect, useState } from 'react'
import { NewsRenderer } from './NewsRenderer';
import { NewsType } from '@/types';

type PropsType = {
    news: NewsType,
}

export const NewsService: React.FC<PropsType> = ({news}) => {
    const [articlesCount, setArticlesCount] = useState<number>(3);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    const articles = news.articles.slice(0, articlesCount); 

    const handleClick = () => {
        setArticlesCount((articlesCount) => articlesCount + 3);
    }

    useEffect(() => {
        if(articlesCount >= news.totalResults) {
            setIsEnd(true);
        }
    }, [articlesCount])

    return (
        <div className='flex flex-col items-center'>
            <div className="w-full">
                <NewsRenderer articles={articles} />
            </div>
            <button className='text-blue-400 cursor-pointer' onClick={handleClick} disabled={isEnd}>
                {isEnd ? 'На цьому поки все' : 'Показати ще'}
            </button>
        </div>
    )
}
