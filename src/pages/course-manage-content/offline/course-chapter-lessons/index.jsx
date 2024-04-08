import { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { arrayMove } from '@dnd-kit/sortable';
import CreateChapterLessonModal from '../../../../components/common/modal/CreateChapterLessonModal';
import LessonItem from './LessonItem';
import DragDropList from '../DragDropList';

const CourseChapterLessons = ({
  selectedChapterId,
  handleShowListOfChapter
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateLessonModalOpen, setIsCreateLessonModalOpen] = useState(false);

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

  const handleOpenModal = () => {
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
      <CreateChapterLessonModal
        isModalOpen={isCreateLessonModalOpen}
        setIsModalOpen={setIsCreateLessonModalOpen}
      />
      <DragDropList
        handleDragEnd={handleDragEnd}
        data={data}
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