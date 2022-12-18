import { Spin } from "antd";
import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollComponentProps {
    dataLength: number, 
    onFetch: () => void, 
    hasMoreData: boolean, 
    children: ReactNode,
};

export const InfiniteScrollComponent = ({ dataLength, onFetch, hasMoreData, children }: InfiniteScrollComponentProps) => (
    <InfiniteScroll
        scrollThreshold={1}
        dataLength={dataLength}
        next={onFetch}
        hasMore={hasMoreData}
        loader={
            <div style={{ textAlign: 'center' }}>
                <Spin />
            </div>}
    >
        {children}
    </InfiniteScroll>
);