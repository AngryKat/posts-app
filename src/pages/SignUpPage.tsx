import AuthForm from "../components/AuthForm";

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