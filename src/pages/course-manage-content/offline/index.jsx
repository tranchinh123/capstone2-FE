import { useState } from 'react';
import CourseChapters from './course-chapters';
import CourseChapterVideos from './course-chapter-videos';

const OfflineCourseManageContent = ({ data, setData }) => {
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [isShowChapterDetail, setIsShowChapterDetail] = useState(false);

  const handleShowListOfChapter = () => {
    setIsShowChapterDetail(false);
  };

  const handleShowChapterDetail = (id) => {
    setIsShowChapterDetail(true);
    setSelectedChapterId(id);
  };

  return (
    <>
      {isShowChapterDetail ? (
        <CourseChapterVideos
          selectedChapterId={selectedChapterId}
          handleShowListOfChapter={handleShowListOfChapter}
        />
      ) : (
        <CourseChapters
          data={data}
          setData={setData}
          handleShowChapterDetail={handleShowChapterDetail}
        />
      )}
    </>
  );
};

export default OfflineCourseManageContent;