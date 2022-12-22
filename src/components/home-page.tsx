

import { lazy, useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addPost, getPosts } from '../utils/post-requests';
import { PostComponent } from './post-component';
import { InfiniteScrollComponent } from './infinite-scroll-component';
import { ScrollToTopButton } from './scroll-to-top-button';
import { usePostsContext } from '../utils/posts-context-provider';
import { useModalsContext } from '../utils/modal-context-provider';
import { PostFormValues } from '../types/post-types';

const PostForm = lazy(() => import('./post-form'))

const initialValues = { title: '', body: '' };
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
    const { openModal, closeModal } = useModalsContext();
    const { updatePosts, posts } = usePostsContext();
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
        if (posts.length <= 3) {
            const fetchPosts = async () => {
                const { data } = await getPosts(1);
                updatePosts(data);
            };
            fetchPosts();
        }
    }, [posts, updatePosts]);

    const handleSubmit = async (values: PostFormValues, { resetForm }: any) => {
        const response = await addPost(values);
        updatePosts([response.data, ...posts]);
        closeModal();
        resetForm();
    };

    const handleButtonClick = () => {
        openModal(
            <PostForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />,
            { footer: null });
    }

    return (
        <>
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <AddNewPostButton onClick={handleButtonClick} />
                <InfiniteScrollComponent
                    dataLength={posts.length}
                    onFetch={fetchPosts}
                    hasMoreData={hasMoreData}>
                    {posts.map((post) => <PostComponent key={post.id} {...post} />)}
                </InfiniteScrollComponent>

            </div>
            <ScrollToTopButton />
        </>
    );
};

