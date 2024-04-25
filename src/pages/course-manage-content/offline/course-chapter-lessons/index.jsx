import { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import { arrayMove } from '@dnd-kit/sortable';
import CreateChapterLessonModal from '../../../../components/common/modal/CreateChapterLessonModal';
import LessonItem from './LessonItem';
import DragDropList from '../DragDropList';
import useAxios from '../../../../hooks/useAxios';

const CourseChapterLessons = ({
  selectedChapterId,
  handleShowListOfChapter
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCreateLessonModalOpen, setIsCreateLessonModalOpen] = useState(false);
  const [selectedLessonId, setSelectedSessionId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { api } = useAxios();
  const { id } = useParams();

  const getLessons = async () => {
    try {
      window.showLoading(true);
      const { data } = await api.post(`/admin/lesson/get-data`, {
        id_cource: +id,
        id_chapter: +selectedChapterId,
      });
      setData(data.lessons);
      window.showLoading(false);
    } catch (error) {
      window.showLoading(false);
    }
  }

  useEffect(() => {
    getLessons();
  }, [])

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      try {
        const activeIndex = data.map((d) => d.id).indexOf(active.id);
        const overIndex = data.map((d) => d.id).indexOf(over.id);
        console.log(arrayMove(data, activeIndex, overIndex));
        setData(arrayMove(data, activeIndex, overIndex));
        await api.post('/admin/lesson/change-position', {
          id_cource: +id,
          id_chapter: +selectedChapterId,
          id_previous: active.id,
          id_next: over.id
        })
        // setData((data) => {
        //   const activeIndex = data.map((d) => d.id).indexOf(active.id);
        //   const overIndex = data.map((d) => d.id).indexOf(over.id);
        //   return arrayMove(data, activeIndex, overIndex);
        // });
      } catch (error) {
        console.log(error, 'error');
      }
    }
  };

  const handleOpenModal = ({ edit, id }) => {
    edit ? setEditMode(true) : setEditMode(false);
    id ? setSelectedSessionId(id) : setSelectedSessionId(null);
    setIsCreateLessonModalOpen(true);
  };

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: '20px' }}
        items={[
          {
            title: (
              <a type="button" onClick={() => handleShowListOfChapter()}>
                Chapters
              </a>
            )
          },
          {
            title: 'Chapter lessons'
          }
        ]}
      />
     {isCreateLessonModalOpen && (
        <CreateChapterLessonModal
          isModalOpen={isCreateLessonModalOpen}
          setIsModalOpen={setIsCreateLessonModalOpen}
          editMode={editMode}
          selectedLessonId={selectedLessonId}
          selectedChapterId={selectedChapterId}
          getLessons={getLessons}
        />
     )}
      <DragDropList
        handleDragEnd={handleDragEnd}
        data={data}
        setData={setData}
        handleOpenModal={handleOpenModal}
        handleShowDetail={handleOpenModal}
        buttonText="New lesson"
        title="Lesson"
        Item={LessonItem}
      />
    </>
  );
};

export default CourseChapterLessons;