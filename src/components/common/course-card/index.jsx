import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";

const CourseCard = () => {
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX8CFwswJggZBDP67N7_y6Kul4C60ACf7QgvsKwsztCkdtudAyERD19rdJuHWWRcPd5iQ&usqp=CAU"
          alt=""
        />
        <div>
          <h2
            style={{ color: "#3F7C93", cursor: "pointer" }}
            onClick={() => navigate("/courses/123123")}
          >
            Cinematic Techniques
          </h2>
          <p style={{ color: "#848588", marginBottom: "5px" }}>
            Dive in and learn React.js from scratch! Learn React, Hooks, Redux,
            React Router, Next.js, Best Practices and way more!
          </p>
          <p
            style={{
              color: "#848588",
              marginBottom: "5px",
              fontSize: "12px",
              fontWeight: "400",
            }}
          >
            Maximilian Schwarzmüller
          </p>
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
            <span>4 Chapters - 68.5 hours</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default CourseCard;
