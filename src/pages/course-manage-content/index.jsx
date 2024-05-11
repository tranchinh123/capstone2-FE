import { useState, useEffect } from "react";
import { useParams } from "react-router";
import OfflineCourseManageContent from "./offline";
import OnlineCourseManageContent from "./online";
import useAxios from "../../hooks/useAxios";

const CourseManageContentPage = () => {
  const [data, setData] = useState(undefined);
  const [courseType, setCourseType] = useState();
  const { id } = useParams();
  const { api } = useAxios();

  useEffect(() => {
    const getCourseDetail = async () => {
      try {
        window.showLoading(true);
        const [res1, res2] = await Promise.all([
          api.get(`/admin/cource/get-data/${id}`),
          api.get(`/admin/chapter/get-data/${id}`),
        ]);
        setCourseType(res1.data.cources.cource_type);
        setData(JSON.parse(res2.data.chapters[0].chapter));
        window.showLoading(false);
      } catch (error) {
        window.showLoading(false);
      }
    };
    getCourseDetail();
  }, []);

  return (
    <>
      {courseType === 0 && data !== undefined && (
        <OnlineCourseManageContent data={data} setData={setData} />
      )}
       {(courseType === 1 && data !== undefined) && <OfflineCourseManageContent data={data} setData={setData} />}
    </>
  );
};

export default CourseManageContentPage;
