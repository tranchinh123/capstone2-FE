import { useState } from 'react';
import CourseChapters from './course-chapters';
import CourseChapterVideos from './course-chapter-videos';

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