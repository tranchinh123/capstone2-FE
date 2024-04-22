import { List, Popconfirm, message, Button } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator, MdEdit, MdDelete } from 'react-icons/md';

const LessonItem = ({ item, handleShowVideoDetail }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  return (
    <div key={item.id} ref={setNodeRef} style={style} {...attributes}>
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
              {item.lesson_name}
            </div>
          }
          // description={item.email}
        />
        <div style={{ display: 'flex', gap: '20px', fontSize: '20px' }}>
          <Button
            onClick={() => handleShowVideoDetail({ edit: true, id: item.id })}
            icon={<MdEdit style={{ width: '20px', height: '20px' }} />}
            type="text"
          />
          <Popconfirm
            title="Delete the lesson"
            description="Are you sure to delete this lesson?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              icon={<MdDelete style={{ width: '20px', height: '20px' }} />}
            />
          </Popconfirm>
        </div>
      </List.Item>
    </div>
  );
};

export default LessonItem;