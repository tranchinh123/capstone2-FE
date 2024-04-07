import { useEffect, useState } from 'react';
import { Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import LItem from '/Capstone2-FE/src/components/common/collapse/LItem';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch(
            'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
        )
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setData((data) => {
                const activeIndex = data.map((d) => d.email).indexOf(active.id);
                const overIndex = data.map((d) => d.email).indexOf(over.id);
                return arrayMove(data, activeIndex, overIndex);
            });
        }
    };

    return (
        <>
            <h1
                style={{
                    color: '#838F99',
                    fontWeight: 'normal',
                    margin: '0px 0px 14px 10px'
                }}
            >
                Course chapters
            </h1>
            <div
                id="scrollableDiv"
                style={{
                    height: '80vh',
                    overflow: 'auto',
                    padding: '0 16px'
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={data.map((d) => d.email)}
                            strategy={verticalListSortingStrategy}
                        >
                            <List
                                dataSource={data}
                                renderItem={(item) => <LItem key={item.email} item={item} />}
                            />
                        </SortableContext>
                    </DndContext>
                </InfiniteScroll>
            </div>
        </>
    );
};
export default App;