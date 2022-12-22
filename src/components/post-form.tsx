import { Button } from "antd";
import { Field, Form, Formik, FormikState } from "formik"
import { PostFormValues } from "../types/post-types";
import { FormikTextArea, FormikTextField } from "../utils/formik-adapter";
import { PostSchema } from "../utils/post-validation-schema";

interface PostFormProps {
    initialValues: PostFormValues,
    onSubmit: (
        values: PostFormValues,
        actions: { resetForm: (nextState?: Partial<FormikState<PostFormValues>>) => void }
    ) => void,
}

const PostForm = (props: PostFormProps) => {
    return (
        <Formik {...props}
            validationSchema={PostSchema}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
           
        >
            <Form>
                <Field name="title" placeholder="Title" component={FormikTextField} />
                <Field name="body" placeholder="Write something here..." component={FormikTextArea} autoSize={{ minRows: 12, maxRows: 12 }} showCount />
                <Button htmlType="submit" type="primary">Submit</Button>
            </Form>
        </Formik>

    )
};

export default PostForm;