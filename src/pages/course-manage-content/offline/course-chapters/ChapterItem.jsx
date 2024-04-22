import { List, Popconfirm, Button, Dropdown } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator, MdEdit, MdDelete } from 'react-icons/md';

const ChapterItem = ({ item, handleShowChapterDetail, handleOpenModal, setData }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const confirm = async () => {
    try {
      // logic cho chapter delete
    } catch (error) {
      
    }
    console.log(item, 'tiem');
    console.log(e);
  };

  const items = [
    {
      key: '1',
      label: (
        <div onClick={() => handleOpenModal({ edit: true, chapterName: item.name, chapterId: item.id })}>
          Edit chapter name
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => handleShowChapterDetail(item.id)}>
          Edit chapter lessons 
        </div>
      ),
    },
  ];

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
              {item.name}
            </div>
          }
          // description={item.email}
        />
        <div style={{ display: 'flex', gap: '20px', fontSize: '20px' }}>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <Button
              icon={<MdEdit style={{ width: '20px', height: '20px' }} />}
              type="text"
            />
          </Dropdown>
          <Popconfirm
            title="Delete the chapter"
            description="Are you sure to delete this chapter?"
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

export default ChapterItem;