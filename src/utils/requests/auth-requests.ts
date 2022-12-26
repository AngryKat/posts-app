import { sendAuthRequest } from "../api";

export const signUpUser = async (signUpData: object) => {
    return await sendAuthRequest(`:signUp?key=${process.env.REACT_APP_API_KEY}`, { data:{ ...signUpData, returnSecureToken: true } });
};

export const loginUser = async (loginData: object) => {
    return await sendAuthRequest(`:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`, { data:{ ...loginData, returnSecureToken: true } })
};

