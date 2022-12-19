import { Post, PostId } from "../types/post-types";
import { sendRequest } from "./api";

const PAGE_LIMIT = 4;
const POSTS_API = '/posts';

export const getPosts = async (page?: number) => {
    let path = POSTS_API;
    if (page) {
        path += `?_page=${page}&_limit=${PAGE_LIMIT}`;
    }
    const response = await sendRequest(path);
    return response;
};

export const addPost = async (newPost: Post) => {
    const response = await sendRequest(POSTS_API, 'POST', newPost);
    return response;
};
export const editPost = async (id: PostId, newData: Omit<Post, 'id'>) => {
    const path = `${POSTS_API}/${id}`;
    const response = await sendRequest(path, 'PUT', newData);
    return response;
};

export const deletePost = async (id: PostId) => {
    const path = `${POSTS_API}/${id}`;
    const response = await sendRequest(path, 'DELETE');
    return response;
};