import { useState } from 'react';
import CourseChapters from './course-chapters';
import CourseChapterLessons from './course-chapter-lessons';

const OfflineCourseManageContent = ({ data, setData }) => {
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [isShowChapterDetail, setIsShowChapterDetail] = useState(false);

  const handleShowListOfChapter = () => {
    setIsShowChapterDetail(false);
  };

  const handleShowChapterDetail = () => {
    setIsShowChapterDetail(true);
    // setSelectedChapterId()
  };

  return (
    <>
      {isShowChapterDetail ? (
        <CourseChapterLessons
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