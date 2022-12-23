

import { lazy, useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PostCard } from './post/post-card';
import { InfiniteScrollComponent } from './infinite-scroll-component';
import { ScrollToTopButton } from './scroll-to-top-button';

import { PostFormValues } from '../types/post-types';
import { useModalsContext } from 'utils/providers/modal-context-provider';
import { addPost, getPosts } from 'utils/requests/post-requests';
import { observer } from 'mobx-react-lite';
import postStore from 'utils/store/posts-store';

const PostForm = lazy(() => import('./post/post-form'))

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

export const HomePage = observer(() => {
    const { openModal, closeModal } = useModalsContext();
    const [hasMoreData, setHasMoreData] = useState(true);
    const [currentPage, setCurrentPage] = useState(2);

    const fetchPosts = async () => {
        const { data } = await getPosts(currentPage);
        if (data.length <= 0) {
            setHasMoreData(false);
            return;
        };
        postStore.concatWithPostArray(data);
        setCurrentPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        if (postStore.posts.length <= 3) {
            const fetchPosts = async () => {
                const { data } = await getPosts(1);
                postStore.posts = data;
            };
            fetchPosts();
        }
    }, []);

    const handleSubmit = async (values: PostFormValues, { resetForm }: any) => {
        const response = await addPost(values);
        postStore.addPost(response.data);
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
                    dataLength={postStore.posts.length}
                    onFetch={fetchPosts}
                    hasMoreData={hasMoreData}>
                    {postStore.posts.map((post: any) => <PostCard key={post.id} {...post} />)}
                </InfiniteScrollComponent>

            </div>
            <ScrollToTopButton />
        </>
    );
});

