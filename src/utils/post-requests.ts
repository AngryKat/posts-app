import { Post } from "../types/post-types";
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
    const response = await sendRequest('/posts', 'POST', newPost);
    return response;
};