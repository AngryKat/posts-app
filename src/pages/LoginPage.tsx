import AuthForm from "../components/auth-form";

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