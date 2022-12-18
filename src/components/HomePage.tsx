

import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getPosts } from '../utils/post-requests';
import { usePostsContext } from '../utils/PostsContextProvider';
import { PostComponent } from './PostComponent';
import { InfiniteScrollComponent } from './InfiniteScrollComponent';
import { ScrollToTopButton } from './ScrollToTopButton';

const AddNewPostButton = ({ onClick }: { onClick: () => void }) => (
    <Button
        onClick={onClick}
        style={{ marginBottom: '1rem' }}
        type="text"
        icon={<PlusOutlined />}>
        Add new post
    </Button>
);

export const HomePage = () => {
    const { updatePosts, posts } = usePostsContext();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [currentPage, setCurrentPage] = useState(2);

    const fetchPosts = async () => {
        const { data } = await getPosts(currentPage);
        if (data.length <= 0) {
            setHasMoreData(false);
            return;
        };
        updatePosts([...posts, ...data]);
        setCurrentPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await getPosts(1);
            updatePosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <>
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <AddNewPostButton onClick={() => setIsModalVisible(true)} />
                <InfiniteScrollComponent dataLength={posts.length} onFetch={fetchPosts} hasMoreData={hasMoreData}>
                    {posts.map((post) => <PostComponent {...post} />)}
                </InfiniteScrollComponent>
            </div>
            <ScrollToTopButton />
            <Modal open={isModalVisible} onCancel={() => setIsModalVisible(false)} />
        </>
    );
};

