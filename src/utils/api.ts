import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/';

export const sendRequest = async (url: string, method: string = 'GET', data: any = {}) => {
    const request = await axios.request({
        url,
        method,
        baseURL,
        data,
    });
    return request;
};