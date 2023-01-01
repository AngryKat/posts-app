import { PostFormValues, PostId } from "../../types/post-types";
import { queryDataBuilder, sendRequest } from "../api";


const PAGE_LIMIT = 8;
const POSTS_API = '/posts';

export const getPosts = async (userId: number | string, page?: number) => {
    let path = POSTS_API;
    if (page) {
        const queryString = queryDataBuilder({ userId, _page: page, _limit: PAGE_LIMIT, _sort: 'date', _order: 'desc' });
        path += queryString;
    }
    const response = await sendRequest(path);
    return response;
};

export const addPost = async (userId: number | string, newPost: PostFormValues) => {
    const response = await sendRequest(POSTS_API, 'POST', { userId, date: new Date(), ...newPost});
    return response;
};
export const editPost = async (id: PostId, newData: PostFormValues) => {
    const path = `${POSTS_API}/${id}`;
    const response = await sendRequest(path, 'PUT', newData);
    return response;
};

export const deletePost = async (id: PostId) => {
    const path = `${POSTS_API}/${id}`;
    const response = await sendRequest(path, 'DELETE');
    return response;
};