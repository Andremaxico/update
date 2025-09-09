import { ArticleType } from '@/app/types'
import React from 'react'

type PropsType = {
    data: ArticleType,
}

export const MiniArticle: React.FC<PropsType> = ({data}) => {
    const { author, content, description, publishedAt, title, urlToImage, url, source } = data;

    return (
        <div className='flex items-center mb-2 last:mb-0 group'>
            <div className="">
                <a href={url} target='_blank'>
                    <h6 className='mb-1 font-semibold group-hover:text-blue-600 duration-50'>{title}</h6>
                </a>
                <p className='mb-1 text-sm text-gray-400'>{source.name}</p>
            </div>
            <div className={'w-15 h-15 rounded-lg overflow-hidden shrink-0'}>
                <img src={urlToImage} className='object-cover w-full h-full'/>
            </div>
        </div>
    )
}
