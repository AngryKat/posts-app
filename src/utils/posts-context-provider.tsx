import { createContext, ReactNode, useContext, useState } from "react";
import { Post, PostId } from "../types/post-types";

interface PostsContextType {
    posts: Post[],
    currentPostId: null | PostId,
    updatePostId: (id: PostId) => void,
    updatePosts: (newData: Post[]) => void,
};

const PostsContext = createContext<PostsContextType>({
    posts: [],
    currentPostId: null,
    updatePostId: () => { },
    updatePosts: () => { },
});

export const PostsContextProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPostId, setCurrentPostId] = useState<null | PostId>(null);
    const updatePostId = (id: PostId) => {
        setCurrentPostId(id);
    };
    const updatePosts = (newData: Post[]) => {
        setPosts(newData);
    }

    return (
        <PostsContext.Provider value={{ posts, currentPostId, updatePostId, updatePosts }}>
            {children}
        </PostsContext.Provider>
    )
};

export const usePostsContext = () => useContext(PostsContext) || {};