import { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { arrayMove } from '@dnd-kit/sortable';
import CreateChapterVideoModal from '../../../../components/common/modal/CreateChapterVideoModal';
import VideoItem from './VideoItem';
import DragDropList from '../DragDropList';

const CourseChapterVideos = ({
  selectedChapterId,
  handleShowListOfChapter
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [IsCreateChapterModalOpen, setIsCreateChapterModalOpen] =
    useState(false);

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
    setIsCreateChapterModalOpen(true);
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
            title: 'Chapter videos'
          }
        ]}
      />
      <CreateChapterVideoModal
        isModalOpen={IsCreateChapterModalOpen}
        setIsModalOpen={setIsCreateChapterModalOpen}
      />
      <DragDropList
        handleDragEnd={handleDragEnd}
        data={data}
        handleOpenModal={handleOpenModal}
        handleShowDetail={handleOpenModal}
        buttonText="New video"
        title="Videos"
        Item={VideoItem}
      />
    </>
  );
};

export default CourseChapterVideos;