import { List, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

const DragDropList = ({
  handleDragEnd,
  data,
  setData,
  handleOpenModal,
  handleShowDetail,
  buttonText,
  title,
  Item
}) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <h1
          style={{
            color: '#838F99',
            fontWeight: 'normal',
            margin: '0px 0px 14px 10px'
          }}
        >
          {title}
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
        >
          {buttonText}
        </Button>
      </div>
      {data && (
       <div
       id="scrollableDiv"
       style={{
         height: '70vh',
         overflow: 'auto',
         padding: '0 16px'
       }}
     >
       <DndContext
         collisionDetection={closestCenter}
         onDragEnd={handleDragEnd}
       >
         <SortableContext
           items={data.map((d) => d.id)}
           strategy={verticalListSortingStrategy}
         >
           <List
             dataSource={data}
             renderItem={(item) => (
               <Item
                 key={item.id}
                 data={data}
                 item={item}
                 handleShowVideoDetail={handleShowDetail}
                 handleShowChapterDetail={handleShowDetail}
                 handleOpenModal={handleOpenModal}
                 setData={setData}
               />
             )}
           />
         </SortableContext>
       </DndContext>
     </div>
     )}
    </>
  );
};

export default DragDropList;