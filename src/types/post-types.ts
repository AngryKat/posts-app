export interface Post {
    userId: 1, // temp
    id: number,
    title: string,
    body: string,
    date: Date,
};

export type PostId = number;

export type PostProps = Omit<Post, 'userId'>;

export type PostFormValues = Omit<PostProps, 'id' | 'date'>
