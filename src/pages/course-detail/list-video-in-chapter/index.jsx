import { useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import styles from "./styles.module.scss";

const ListVideoInChapter = ({ lessons }) => {
  const [videos, setVideos] = useState([]);

  return (
    <>
      {lessons.map((l, idx) => (
        <div key={idx} className={styles.video}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>
              <BiMoviePlay
                style={{
                  fontSize: "17px",
                  marginRight: "10px",
                  marginTop: "10px",
                }}
              />
            </span>
            <span>
              {l.lesson_name} {l.id_excercise && "(including excercise)"}
            </span>
          </div>
          <div>{l.time}</div>
        </div>
      ))}
    </>
  );
};

export default ListVideoInChapter;
