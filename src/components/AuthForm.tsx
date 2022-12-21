import { Button, Typography } from "antd";
import { Field, Form, Formik } from "formik";
import { FormikTextField } from "../utils/formikAdapter";

export default function AuthForm({ isSignUp = false }) {
    const title = isSignUp ? 'Sign Up' : 'Login';
    return (<>
        <Typography>{title}</Typography>
        <Formik
            initialValues={{
                login: '',
                password: '',
                ...(isSignUp && {repeatPassowrd: ''}),
            }}
            onSubmit={(values) => { console.log('aaa submit!', { values }) }}>
            <Form style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Field name="login"  component={FormikTextField} />
                <Field name="password" component={FormikTextField} type="password" />
                {isSignUp && <Field name="repeatPassword" component={FormikTextField} type="password" />}
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