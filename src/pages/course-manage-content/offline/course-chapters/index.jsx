import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { arrayMove } from '@dnd-kit/sortable';
import CreateCourseChapterModal from '../../../../components/common/modal/CreateCourseChapterModal';
import ChapterItem from './ChapterItem';
import DragDropList from '../DragDropList';

const CourseChapters = ({ data, setData, handleShowChapterDetail }) => {
  const [IsCreateChapterModalOpen, setIsCreateChapterModalOpen] =
    useState(false);

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

  const handleOpenModal = () => {
    setIsCreateChapterModalOpen(true);
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
      <CreateCourseChapterModal
        isModalOpen={IsCreateChapterModalOpen}
        setIsModalOpen={setIsCreateChapterModalOpen}
      />
      <DragDropList
        handleDragEnd={handleDragEnd}
        data={data}
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