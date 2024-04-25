import { List, Popconfirm, Button, Dropdown } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator, MdEdit, MdDelete } from 'react-icons/md';
import useAxios from '../../../../hooks/useAxios';
import { useParams } from 'react-router';

const ChapterItem = ({ item, handleShowChapterDetail, handleOpenModal, data, setData }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const { api } = useAxios();
  const { id } = useParams();


  const handleCheckCanDelete = async () => {
    try {
      const response = await api.post('/admin/chapter/check-is-destroy', {
        id_cource: id,
        id_chapter: item.id,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const confirm = async () => {
    try {
      window.showLoading(true);
      const response1 = await handleCheckCanDelete();
      if (response1.data.status) {
        const newData = data.filter(d => {
          if(d.id !== item.id) {
            return d;
          }
        })
        const response2 = await api.post('/admin/chapter/update', {
          id,
          chapter: JSON.stringify(newData)
        })
        if(response2.data.message === 'Successfully update a chapter') setData(newData);
        window.showLoading(false);
        window.openNoti('Message', `Delete chapter successfully.`);
      } else {
        window.showLoading(false);
        window.openNoti('Message', 'Can not delete chapter because it contains lesson.');
      }
    } catch (error) {
      console.log(error);
    }
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