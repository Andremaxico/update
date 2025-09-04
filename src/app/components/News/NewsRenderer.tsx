import { ArticleType, NewsType } from '@/app/types'
import React from 'react'
import { MiniArticle } from './MiniArticle'

type PropsType = {
    articles: ArticleType[],
}

export const NewsRenderer: React.FC<PropsType> = ({articles}) => {
    return (
        <>
            {articles.map(article => (
                <MiniArticle data={article} key={article.url} />
            ))}
        </>
    )
}
