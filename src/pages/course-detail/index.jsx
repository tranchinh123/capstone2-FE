import { useState, useEffect, Children } from "react";
import { Collapse, Button } from "antd";
import ListVideoInChapter from "./list-video-in-chapter";
import styles from "./styles.module.scss";
import useAxios from "../../hooks/useAxios";
import { useParams, useNavigate } from "react-router-dom";

const CourseDetailPage = () => {
  const [courseInfo, setCourseInfo] = useState();
  const [items, setItems] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState();
  const navigate = useNavigate();

  const { api } = useAxios();
  const { id } = useParams();

  const onChange = (key) => {
    console.log(key);
  };

  const checkEnroll = async () => {
    try {
      const { data } = await api.get(`/user/cource/check-register/${id}`);
      setIsEnrolled(data.is_register);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseDetail = async () => {
    try {
      window.showLoading(true);
      const { data } = await api.get(`/user/cource/${id}`);
      const chapters = JSON.parse(data.cource.chapter);
      setCourseInfo(data.cource);
      setItems(
        chapters.map((c, idx) => ({
          id: idx,
          label: <span style={{ fontWeight: "bold" }}>{c.name}</span>,
          children: (
            <ListVideoInChapter
              lessons={data.lessons.filter((l) => l.id_chapter === c.id)}
            />
          ),
        }))
      );
      window.showLoading(false);
    } catch (error) {
      window.showLoading(false);
      console.log(error);
    }
  };

  const handleEnrollCourse = async () => {
    try {
      window.showLoading(true);
      await api.get(
        `/user/cource/${isEnrolled ? "un-register" : "register"}/${id}`
      );
      window.openNoti(
        "Message",
        `${isEnrolled ? "Unregister" : "Register"} the course successfully.`
      );
      window.showLoading(false);
      checkEnroll();
    } catch (error) {
      window.openNoti(
        "Message",
        `Failed to ${isEnrolled ? "unregister" : "register"} the course.`
      );
      window.showLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    checkEnroll();
  }, []);

  useEffect(() => {
    getCourseDetail();
  }, []);

  return (
    <>
      {courseInfo && (
        <div className={styles.courseDetailPage}>
          <div className={styles.courseBanner}>
            <img
              style={{ maxHeight: "200px", maxWidth: "200px" }}
              src={courseInfo.cource_image}
              alt=""
            />
            <div className={styles.courseIntro}>
              <h1>{courseInfo.cource_name}</h1>
              <p>{courseInfo.cource_introduce}</p>
              {courseInfo.cource_type !== 0 && (
            <div style={{ alignSelf: 'flex-end' }}>
                <Button
                  type="primary"
                  style={{
                    marginLeft: "20px",
                  }}
                  onClick={handleEnrollCourse}
                >
                  {isEnrolled ? "Unregister" : "Register"}
                </Button>
                {isEnrolled && (
                  <Button
                    type="primary"
                    style={{
                      marginLeft: "20px",
                      background: "green",
                    }}
                    onClick={() => navigate(`/course-learning/offline/${id}`)}
                  >
                    Go to course
                  </Button>
                )}
               </div>
            )}
            </div>
          </div>

          <div className={styles.courseContent}>
          {courseInfo.cource_type !== 0 ? (
            <> 
              <h2>Course content</h2>
              <Collapse items={items} defaultActiveKey={['0']} onChange={onChange} />
            </>
          ) : <></>}
            <h2>Description</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: courseInfo.cource_description,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetailPage;
