

import { createContext, useContext, useEffect, useState } from 'react';
import { Button, Layout, Col, Row, Modal } from 'antd';
import { PlusOutlined, ArrowUpOutlined } from '@ant-design/icons';
import TweenOne, { AnimObjectOrArray } from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { Parallax } from 'rc-scroll-anim';
import { getPosts } from '../utils/post-requests';
import { Post } from '../types/post-types';
import { PostComponent } from './PostComponent';
import { Content, Footer } from 'antd/es/layout/layout';
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [currentPage, setCurrentPage] = useState(2);
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        const { data } = await getPosts(currentPage);
        if (data.length <= 0) {
            setHasMoreData(false);
            return;
        };
        setPosts((prevData) => [...prevData, ...data]);
        setCurrentPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await getPosts(1);
            setPosts(data);
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

            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} />
        </>
    );
};

