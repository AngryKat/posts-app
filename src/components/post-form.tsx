import { Button } from "antd";
import { Field, Form, Formik, FormikState } from "formik"
import { PostFormValues } from "../types/post-types";

interface PostFormProps {
    initialValues: PostFormValues,
    onSubmit: (
        values: PostFormValues,
        actions: { resetForm: (nextState?: Partial<FormikState<PostFormValues>>) => void }
    ) => void,
}

const PostForm = (props: PostFormProps) => {
    console.log('aaa ', { initialValues: props.initialValues });
    return (
        <Formik {...props} enableReinitialize>
            <Form>
                <Field name="title" />
                <Field name="body" />
                <Button htmlType="submit" type="primary">Submit</Button>
            </Form>
        </Formik>

    )
};

export default PostForm;