import { sendAuthRequest } from "./api";

const API_KEY = 'AIzaSyBRzydU9gvmc_oqXYgjFZf8co5VyrOUcWs';

export const signUpUser = (signUpData: object) => {
    sendAuthRequest(`:signUp?key=${API_KEY}`, { data:{ ...signUpData, returnSecureToken: true } })
};

export const loginUser = (loginData: object) => {
    sendAuthRequest(`:signInWithPassword?key=${API_KEY}`, { data:{ ...loginData, returnSecureToken: true } })
};

