import { useState, useEffect } from "react";
import CreateAndManageCourse from "../../components/common/create-manage-course";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
const CourseManageDescriptionPage = () => {
  const [course, setCourse] = useState();
  const { id } = useParams();
  const { api } = useAxios();
  console.log(course, "course");

  const handleGetCourseInfo = async () => {
    window.showLoading(true);
    try {
      const { data } = await api.get(`/admin/cource/get-data/${id}`);
      setCourse(data.cources);
      window.showLoading(false);
    } catch (error) {
      console.log(error);
      window.showLoading(false);
    }
  };

  useEffect(() => {
    handleGetCourseInfo();
  }, []);

  return (
    <>
      {course && (
        <CreateAndManageCourse
          propCourse={course}
          handleGetCourseInfo={handleGetCourseInfo}
        />
      )}
    </>
  );
};

export default CourseManageDescriptionPage;
