import { sendAuthRequest } from "../api";

export const signUpUser = async (signUpData: object) => {
    return await sendAuthRequest(`:signUp?key=${process.env.REACT_APP_API_KEY}`, { data:{ ...signUpData, returnSecureToken: true } });
};

export const loginUser = async (loginData: object) => {
    return await sendAuthRequest(`:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`, { data:{ ...loginData, returnSecureToken: true } })
};

export const getUser = async (idToken: string) => {
    console.log('aaa get ')
    return await sendAuthRequest(`:lookup?key=${process.env.REACT_APP_API_KEY}`, { data:{ idToken } })
};

