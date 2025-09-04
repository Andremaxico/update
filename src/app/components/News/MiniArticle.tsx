import { ArticleType } from '@/app/types'
import React from 'react'

type PropsType = {
    data: ArticleType,
}

export const MiniArticle: React.FC<PropsType> = ({data}) => {
    const { author, content, description, publishedAt, title, urlToImage, url, source } = data;

    return (
        <div className=''>
            <a href={url}>
                <h6 className='mb-1 font-semibold'>{title}</h6>
            </a>
            <p className='mb-1 text-sm text-gray-400'>{source.name}</p>
            <div className={'w-10 h-4 rounded-lg'}>
                <img src={urlToImage} className='object-fit'/>
            </div>
        </div>
    )
}
