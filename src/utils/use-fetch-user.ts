import { useEffect, useState } from "react"
import { getUser } from "./requests/auth-requests";

export const useFetchUser = () => {
    const token = localStorage.getItem('token') || '';
    const [state, setState] = useState<any>({
        user: null,
        isLoading: true,
        error: null,
    })

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await getUser(token);
                setState((prev: any) => ({ ...prev, user: data.users[0], isLoading: !data.users[0] }));
            } catch (error) {
                setState((prev: any) => ({ ...prev, error }))
            }
        }
        fetch();
    }, [token])

    return state;
}