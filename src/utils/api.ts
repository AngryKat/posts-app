import axios from 'axios';

const baseURL = 'http://localhost:8080/';
const authBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';

type reqMethod =  'GET' | 'POST' | 'DELETE' | 'PUT';

export const sendRequest = async (url: string, method: reqMethod = 'GET', data: any = {}) => {
    const request = await axios.request({
        url,
        method,
        baseURL,
        data,
    });
    return request;
};

export const sendAuthRequest = async (url = '', { method = 'POST', data = {} }: { method?: reqMethod, data?: object } ) => {
    const request = await axios.request({
        url,
        method,
        baseURL: authBaseUrl,
        data,
    });
    return request;
}

type dataType = {
    [key : string | number ]: string | number | boolean
}

export const queryDataBuilder = (data: dataType) => {
    const res = [];
    for (let d in data)
      res.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return '?'+res.join('&');
 }