import { Empty, Spin, Typography } from "antd";
import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollComponentProps {
    scrollableTarget?: string,
    dataLength: number,
    onFetch: () => void,
    hasMoreData: boolean,
    children: ReactNode,
};

export const InfiniteScrollComponent = ({ scrollableTarget, dataLength, onFetch, hasMoreData, children }: InfiniteScrollComponentProps) => {
    if (dataLength === 0) {
        return <Empty description="No posts" />
    }
    return (
        <InfiniteScroll
            scrollableTarget={scrollableTarget}
            dataLength={dataLength}
            next={onFetch}
            hasMore={hasMoreData}
            scrollThreshold={1}
            loader={
                <div style={{ textAlign: 'center' }}>
                    <Spin />
                </div>}
        >
            {children}
        </InfiniteScroll>

    )
};