import { Card, Dropdown, MenuProps } from "antd";
import { EllipsisOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Post, PostFormValues, PostId, PostProps } from "../types/post-types";
import { deletePost, editPost } from "../utils/post-requests";
import { usePostsContext } from "../utils/PostsContextProvider copy";
import { useModalsContext } from "../utils/ModalContextProvider";
import { PostForm } from "./PostForm";
import { Formik, FormikBag } from "formik";

interface MenuActions {
    delete: (id: PostId) => void,
    edit: (id: PostId) => void,
};


const items: MenuProps['items'] = [
    {
        key: 'edit',
        icon: <EditOutlined />,
        label: "edit",
    },
    {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: "delete",
    },
];





const MoreActionsButton = ({ onClick }: MenuProps) => (
    <Dropdown menu={{ items, onClick }}>
        <EllipsisOutlined key="ellipsis" />
    </Dropdown>

);

export const PostComponent = ({ id, title, body, date }: PostProps) => {
    const { openModal, closeModal } = useModalsContext();
    const { updatePosts, posts } = usePostsContext();
    const dateToDisplay = new Date(date).toLocaleString();

    const handleSubmit = (values: PostFormValues, { resetForm }: any) => {
        editPost(id, values);
        const postIndex = posts.findIndex((post) => post.id === id);
        let updatedPosts = [...posts];
        updatedPosts[postIndex] = { ...(posts[postIndex]), ...values };
        updatePosts(updatedPosts);
        closeModal();
        resetForm();
    };

    const menuActions: MenuActions = {
        delete: () => {
            deletePost(id);
            updatePosts(posts.filter((post) => post.id !== id));
        },
        edit: () => {
            openModal(
                <PostForm
                    initialValues={{ title, body }}
                    onSubmit={handleSubmit}
                />,
                { footer: null });
        }
    }

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        menuActions[key as keyof MenuActions](id);
    };


    return (
        <Card
            title={title}
            extra={<MoreActionsButton onClick={handleMenuClick} />}
            style={{ marginBottom: 16 }}>
            {body}
            {date && <Card.Meta description={dateToDisplay} />}
        </Card>

    )
};