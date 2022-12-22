import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    return (
        <div id="error-page">
            <i>{error.statusText || error.message}</i>
        </div>
    );
}