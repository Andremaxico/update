export type NewsType = {
    status: string, 
    totalResults: number,
    articles: ArticleType[],
}

export type ArticleType = {
    source: {
        id: null | number,
        name: string,
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
}

export type BasicResponse<T> = {
    message: string,
    status: number,
    data: T | null,
    error: null | string,
}

