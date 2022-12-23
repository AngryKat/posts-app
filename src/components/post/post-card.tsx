import { lazy } from "react";
import { Card, Dropdown, MenuProps } from "antd";
import { EllipsisOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PostFormValues, PostId, PostProps } from "../../types/post-types";
import { useModalsContext } from "utils/providers/modal-context-provider";
import { deletePost, editPost } from "utils/requests/post-requests";
import postStore from "utils/store/posts-store";

const PostForm = lazy(() => import("./post-form"));

enum MenuAction {
    edit = 'edit',
    delete = 'delete',
};

type MenuActions = {
    [index in MenuAction]: (id: PostId) => void
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

export const PostCard = ({ id, title, body, date }: PostProps) => {
    const { openModal, closeModal } = useModalsContext();
    const dateToDisplay = new Date(date).toLocaleString();

    const menuActionsHandlers: MenuActions = {
        delete: () => {
            deletePost(id);
            postStore.deletePost(id);
        },
        edit: () => {
            openModal(
                <PostForm
                    initialValues={{ title, body }}
                    onSubmit={handleSubmit}
                />,
                { footer: null });
        }
    };

    const handleSubmit = (values: PostFormValues, { resetForm }: any) => {
        editPost(id, values);
        postStore.editPost(id, values);
        closeModal();
        resetForm();
    };

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        menuActionsHandlers[key as MenuAction](id);
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