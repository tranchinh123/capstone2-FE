import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { arrayMove } from '@dnd-kit/sortable';
import CreateCourseChapterModal from '../../../../components/common/modal/CreateCourseChapterModal';
import ChapterItem from './ChapterItem';
import DragDropList from '../DragDropList';
import useAxios from '../../../../hooks/useAxios';
const CourseChapters = ({ data, setData, handleShowChapterDetail }) => {
  const [IsCreateChapterModalOpen, setIsCreateChapterModalOpen] =
    useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedChapterName, setSelectedChapterName] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const { api } = useAxios();
  const { id } = useParams();


  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeIndex = data.map((d) => d.id).indexOf(active.id);
      const overIndex = data.map((d) => d.id).indexOf(over.id);
      const newData = arrayMove(data, activeIndex, overIndex);
      setData(newData);
      window.showLoading(true);
      try {
        await api.post('/admin/chapter/update', {
          id,
          chapter: JSON.stringify(newData)
        });
        window.showLoading(false);
        window.openNoti('Message', `Update chapter order successfully.`);
      } catch (error) {
        window.showLoading(false);
        window.openNoti('Message', `Failed to update chapter order.`);
      }
    }
  };

  const handleOpenModal = ({ edit, chapterName, chapterId }) => {
    setIsCreateChapterModalOpen(true);
    edit ? setEditMode(true) :  setEditMode(false);
    chapterName ? setSelectedChapterName(chapterName) : setSelectedChapterName('');
    chapterId ? setSelectedChapterId(chapterId) : setSelectedChapterId(null);
  };

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: '20px' }}
        items={[
          {
            title: <Link to="/courses">Courses</Link>
          },
          {
            title: 'Course chapters'
          }
        ]}
      />
       {IsCreateChapterModalOpen && (
        <CreateCourseChapterModal
          isModalOpen={IsCreateChapterModalOpen}
          setIsModalOpen={setIsCreateChapterModalOpen}
          editMode={editMode}
          selectedChapterName={selectedChapterName}
          selectedChapterId={selectedChapterId}
          data={data}
          setData={setData}
        />
      )}
      <DragDropList
        handleDragEnd={handleDragEnd}
        data={data}
        setData={setData}
        handleOpenModal={handleOpenModal}
        handleShowDetail={handleShowChapterDetail}
        buttonText="New chapter"
        title="Chapters"
        Item={ChapterItem}
      />
    </>
  );
};
export default CourseChapters;