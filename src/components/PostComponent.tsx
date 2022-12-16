import { Card, Dropdown, MenuProps } from "antd";
import { EllipsisOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';



interface PostProps {
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

const MoreActionsButton = () => (
    <Dropdown menu={{ items }}>
        <EllipsisOutlined key="ellipsis" />
    </Dropdown>

);

export const PostComponent = ({ title, body }: PostProps) => (
    <Card title={title} extra={<MoreActionsButton />} style={{ marginBottom: 16 }}>
        {body}
    </Card>
);