import { List } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator, MdEdit } from 'react-icons/md';

const LessonItem = ({ item, handleShowVideoDetail }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.email });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div key={item.email} ref={setNodeRef} style={style} {...attributes}>
            <List.Item>
                <List.Item.Meta
                    title={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#001529',
                                gap: '20px',
                                fontWeight: 'normal'
                            }}
                            href="https://ant.design"
                        >
                            <MdDragIndicator
                                style={{
                                    cursor: 'move',
                                    fontSize: '20px'
                                }}
                                {...listeners}
                            />
                            {item.name.last}
                        </div>
                    }
                // description={item.email}
                />
                <div style={{ display: 'flex', gap: '20px', fontSize: '20px' }}>
                    <MdEdit
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleShowVideoDetail()}
                    />
                </div>
            </List.Item>
        </div>
    );
};

export default LessonItem;