import { Button, Typography } from "antd";
import { Field, Form, Formik } from "formik";
import { loginUser, signUpUser } from "../utils/requests/auth-requests";
import { LoginSchema, SignupSchema } from "../utils/validationSchemas/auth-validation-schema";
import { FormikTextField } from "../utils/formik-adapter";

export default function AuthForm({ isSignUp = false }) {
    const title = isSignUp ? 'Sign Up' : 'Login';
    const handleSubmit = async (values: { email: string, password: string }) => {
        const { email, password } = values;
        if (isSignUp) {
            const data = await signUpUser({ email, password });
            console.log('aaa ', { data });
        }
        else {
            const data = await loginUser({ email, password });
            console.log('aaa ', { data });
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