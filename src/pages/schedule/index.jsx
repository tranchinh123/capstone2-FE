import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useAppContext } from "../../contexts/MainContext";

const SchedulePage = () => {
  const { api } = useAxios();
  const { user } = useAppContext();

  const getSchedules = async () => {
    try {
      const { data } = await api.get("/user/list-my-schedule");
      console.log(data, "data");
      return data.schedules;
    } catch (error) {
      console.log(error);
    }
  };

  const eventContent = (eventInfo) => {
    const { room_id, time, teacher } = eventInfo.event._def.extendedProps;
    const classId = eventInfo.event._def.publicId;
    console.log(eventInfo, "eventInfo");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontWeight: "bold",
          padding: "5px",
          background: user.id === teacher && "#A30000",
        }}
      >
        <span>
          <span style={{ color: "#61BCFF" }}>Lesson: </span>
          {eventInfo.event.title}
        </span>
        <span>
          <span style={{ color: "#61BCFF" }}>Room: </span>
          <Link to={`/course-learning/online/${classId}?roomId=${room_id}`}>
            {room_id}
          </Link>
        </span>
        <span>
          <span style={{ color: "#61BCFF" }}>Time: </span>
          {JSON.parse(time)[0]} - {JSON.parse(time)[1]}
        </span>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{ width: "10px", height: "10px", background: "#A30000" }}
          />
          Teaching
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "rgb(44, 62, 80)",
            }}
          />
          Study
        </div>
      </div>
      <FullCalendar
        event
        eventBackgroundColor="#2C3E50"
        height="85vh"
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={getSchedules}
        // eventClick={handleEventClick}
        eventContent={eventContent}
        eventResizableFromStart
        dayMaxEventRows={3}
      />
    </>
  );
};

export default SchedulePage;
