import { Spin, Typography } from "antd";
import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollComponentProps {
    dataLength: number,
    onFetch: () => void,
    hasMoreData: boolean,
    children: ReactNode,
};

export const InfiniteScrollComponent = ({ dataLength, onFetch, hasMoreData, children }: InfiniteScrollComponentProps) => {
    if (dataLength === 0) {
        return <Typography>No data</Typography>
    }
    return (
    <InfiniteScroll
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

)};