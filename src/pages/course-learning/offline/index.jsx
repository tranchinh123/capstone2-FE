import { useState, useEffect } from "react";
import { Collapse, Button, Tooltip, Popconfirm } from "antd";
import { BiMoviePlay } from "react-icons/bi";
import { SnippetsOutlined } from "@ant-design/icons";
import { FiAlertCircle } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import styles from "./styles.module.scss";

const OfflineCourseLearning = () => {
  const [courseInfo, setCourseInfo] = useState();
  const [items, setItems] = useState();
  const [selectedVideo, setSelectedVideo] = useState("");
  const { api } = useAxios();
  const { id } = useParams();

  const getCourseDetail = async (selectedId) => {
    try {
      window.showLoading(true);
      const { data } = await api.get(`/user/cource/${id}`);
      console.log(data, "data");
      const chapters = JSON.parse(data.cource.chapter);

      setItems(
        chapters.map((c, idx) => ({
          id: idx,
          label: (
            <span style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "bold" }}>{c.name}</span>
              <span>
                {data.lessons.filter((l) => l.id_chapter === c.id).length}
                {data.lessons.filter((l) => l.id_chapter === c.id).length > 1
                  ? " lessons"
                  : " lesson"}
              </span>
            </span>
          ),
          children: (
            <Item
              lessons={data.lessons.filter((l) => l.id_chapter === c.id)}
              courseInfo={data.cource}
              setSelectedVideo={setSelectedVideo}
              getCourseDetail={getCourseDetail}
              selectedId={selectedId}
            />
          ),
        }))
      );
      setCourseInfo(data.cource);
      window.showLoading(false);
    } catch (error) {
      window.showLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseDetail();
  }, []);

  return (
    <>
      {courseInfo && (
        <div className={styles.offlineCourseLearning}>
          <video controls autoPlay key={selectedVideo}>
            <source src={selectedVideo} type="video/mp4" />
          </video>
          <div className={styles.collapseWrapper}>
            <Collapse items={items} bordered={false} defaultActiveKey={["0"]} />
          </div>
        </div>
      )}
    </>
  );
};

export default OfflineCourseLearning;

const Item = ({
  lessons,
  courseInfo,
  setSelectedVideo,
  getCourseDetail,
  selectedId,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      {lessons.map((l) => {
        return (
          <div
            key={l.id}
            className={styles.chappterContainer}
            onClick={() => {
              setSelectedVideo(l.lesson_video);
              getCourseDetail(l.id);
            }}
            style={{ background: selectedId === l.id && "#d6d9db" }}
          >
            <div className={styles.chapterWrapper}>
              <div className={styles.chapterItem}>
                <div className={styles.itemInfo}>
                  <span
                    className={styles.itemName}
                    style={{ fontWeight: "500" }}
                  >{`${l.lesson_name}`}</span>
                  <span className={styles.itemTime}>
                    <BiMoviePlay className={styles.itemTimeIcon} />
                    <span className={styles.itemTimeText}>{l.time}</span>
                  </span>
                </div>
              </div>
              {l.id_excercise && (
                <Popconfirm
                  title="Take the excercise"
                  description="Are you sure to take this excercise?"
                  onConfirm={() =>
                    navigate(`/excercise/do/${id}/${l.id_excercise}`)
                  }
                  onCancel={(e) => e.stopPropagation()}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="dashed"
                    icon={<SnippetsOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>
                      {l.id_excercise === courseInfo.final_excercise
                        ? "Prime excercise"
                        : "Excercise"}
                    </span>
                    {l.id_excercise === courseInfo.final_excercise && (
                    <Tooltip title="This is a prime exercise, you will get certification if you pass this one.">
                      <FiAlertCircle />
                    </Tooltip>
                  )}
                  </Button>
                </Popconfirm>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
