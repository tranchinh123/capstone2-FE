import { List, Popconfirm, Button } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator, MdEdit, MdDelete } from 'react-icons/md';
import useAxios from '../../../../hooks/useAxios';

const LessonItem = ({ item, handleShowVideoDetail, setData, data }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const { api } = useAxios();

  const confirm = async () => {
    window.showLoading(true);
    try {
      const newData = data.filter(d => d.id !== item.id);
      const response = await api.get(`/admin/lesson/destroy/${item.id}`);
      if(response.data.message === 'Successfully delete a lesson') setData(newData);
      window.openNoti('Message', 'Delete the lesson successfully');
      window.showLoading(false);
    } catch (error) {      
      window.openNoti('Message', 'Failed to delete the lesson');
      window.showLoading(false);
    }
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
