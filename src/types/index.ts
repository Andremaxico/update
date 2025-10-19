export type FormPostType = Omit<PostType, 'created_at' | 'id' | 'comments' | 'likes' | 'image_url' | 'commentsCount'>

export type PostType = {
    user_id: string,
    id: string,
    created_at: string,
    username: string,
    avatar_url: string,
    image_url: string | null,
    likes: string[],
    commentOf: string | null,
    commentsCount: number,
    text: string
}

export type ResponseType<DataType> = {
    data: DataType | null;
    errorMessage: string | null,
    status: number,
}

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

