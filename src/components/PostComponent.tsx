import { Card, Dropdown, MenuProps } from "antd";
import { EllipsisOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PostId } from "../types/post-types";
import { deletePost } from "../utils/post-requests";
import { usePostsContext } from "../utils/PostsContextProvider copy";
import { useModalsContext } from "../utils/ModalContextProvider";

interface MenuActions {
    delete: (id: PostId) => void,
    edit: (id: PostId) => void,
};

interface PostProps {
    id: number,
    title: string,
    body: string,

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

export const PostComponent = ({ id, title, body }: PostProps) => {
    const { openModal } = useModalsContext();
    const { updatePosts, posts, updatePostId } = usePostsContext();

    const menuActions: MenuActions = {
        delete: (id: PostId) => {
            deletePost(id);
            updatePosts(posts.filter((post) => post.id !== id));
        },
        edit: (id: PostId) => {
            updatePostId(id);
            openModal(<>I am form!</>);
        }
    }

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        menuActions[key as keyof MenuActions](id);
    };
    return (
        <Card title={title} extra={<MoreActionsButton onClick={handleMenuClick} />} style={{ marginBottom: 16 }}>
            {body}
        </Card>
    )
};