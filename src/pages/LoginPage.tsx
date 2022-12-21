import AuthForm from "../components/AuthForm";

export default function LoginPage() {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',

        }}>
           <AuthForm />
        </div>
    );
};