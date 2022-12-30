import AuthForm from "components/auth-form";

const AuthPage = ({ isSignUp = false }) => <div style={{
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

}}>
    <AuthForm isSignUp={isSignUp} />
</div>

export default AuthPage;