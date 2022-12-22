import * as Yup from 'yup';

export const SignupSchema = Yup.object(
    {
        email: Yup.string()
            .email('Invalid email').required('Required'),
        password: Yup.string()
            .min(8, 'Must be at least 8 characters long')
            .max(50, 'Must be less than 50 characters long')
            .required('Required'),
        repeatPassword: Yup.string()
            .required('Please, confirm password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }
);
export const LoginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email').required('Required'),
    password: Yup.string()
        .required('Required'),
});
