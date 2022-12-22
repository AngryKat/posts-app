import * as Yup from 'yup';

export const PostSchema = Yup.object(
    {
        title: Yup.string().required('Required'),
        body: Yup.string().required('Required'),  
    }
);