import AuthForm from "../components/auth-form";

export default function SignUpPage() {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',

        }}>
           <AuthForm isSignUp />
        </div>
    );
};