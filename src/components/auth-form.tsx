import { Button, Typography } from "antd";
import { Field, Form, Formik } from "formik";
import { loginUser, signUpUser } from "../utils/requests/auth-requests";
import { LoginSchema, SignupSchema } from "../utils/validationSchemas/auth-validation-schema";
import { FormikTextField } from "../utils/formik-adapter";
import { useAuthContext } from "utils/providers/auth-context-provider";
import { redirect } from "react-router-dom";

export default function AuthForm({ isSignUp = false }) {
    const { login } = useAuthContext();
    const title = isSignUp ? 'Sign Up' : 'Login';
    const handleSubmit = async (values: { email: string, password: string }) => {
        const { email, password } = values;
        try {
            let response;
            if (isSignUp) {
                response = await signUpUser({ email, password });
            }
            else {
                response = await loginUser({ email, password });
            }
            login(response.data.idToken);
            redirect('/');
        } catch (error) {
            window.alert(`Error occurred! ${error}`);
        }
       
    }
    return (<>
        <Typography>{title}</Typography>
        <Formik
            initialValues={{
                email: '',
                password: '',
                ...(isSignUp && { repeatPassword: '' }),
            }}
            validationSchema={isSignUp ? SignupSchema : LoginSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            <Form style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Field name="email" type="email" placeholder="Email" component={FormikTextField} />
                <Field name="password" type="password" placeholder="Password" component={FormikTextField} />
                {isSignUp && <Field name="repeatPassword" type="password" placeholder="Confirm password" component={FormikTextField} />}
                <div>
                    <Button
                        htmlType="button"
                        href="/"
                        danger
                    >
                        Cancel
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                    >
                        {title}
                    </Button>
                </div>
                {isSignUp ?
                    <Typography>
                        Already have an account? <a href="/login">Log in!</a>
                    </Typography>
                    : <Typography>
                        Do not have an account? <a href="/signup">Sign up!</a>
                    </Typography>}
            </Form>
        </Formik>
    </>)
};