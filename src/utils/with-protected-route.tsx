
import { ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "utils/providers/auth-context-provider";

export function withProtectedRoute<T>(ComponentToWrap: ComponentType<T>) {
    const WrappedComponent = ({ redirectPath, ...props }: T & { redirectPath: string }) => {
        const navigate = useNavigate();
        const { isLoggedIn } = useAuthContext();

        if (!isLoggedIn) {
            navigate(redirectPath || '/');
            return;
        };
        
        return (
            <ComponentToWrap
                {...props}
                {...(props as T)}
            />
        );
    };

    return WrappedComponent;
};
