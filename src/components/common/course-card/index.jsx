import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";

const CourseCard = ({ id, img, name, introduction, chapters }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <div style={{ display: "flex", gap: "30px" }}>
        <img
          style={{
            width: "300px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          src={img}
          alt=""
        />
        <div>
          <h2
            style={{ color: "#3F7C93", cursor: "pointer" }}
            onClick={() => navigate(`/courses/${id}`)}
          >
            {name}
          </h2>
          <p style={{ color: "#848588", marginBottom: "5px" }}>
            {introduction}
          </p>
          {/* <p
            style={{
              color: '#848588',
              marginBottom: '5px',
              fontSize: '12px',
              fontWeight: '400'
            }}
          >
            Maximilian Schwarzmüller
          </p> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#DAF4FF",
                padding: "6px",
                paddingTop: "9px",
                borderRadius: "50%",
              }}
            >
              <IoBookOutline />
            </span>
            <span>{chapters?.length} Chapters</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default CourseCard;
