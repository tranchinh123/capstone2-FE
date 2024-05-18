import { Link,useNavigate  } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useAppContext } from "../../contexts/MainContext";
import { Button } from 'antd';

const SchedulePage = () => {
  const { api } = useAxios();
  const { user } = useAppContext();
  const navigate = useNavigate();

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

    return (
      <div
      style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', padding: '5px', background: user.id === teacher && '#A30000' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>
            <span style={{ color: '#61BCFF' }}>Lesson: </span>
            {eventInfo.event.title}
          </span>
          <span>
            <span style={{ color: '#61BCFF' }}>Time: </span> 
            {JSON.parse(time)[0]} - {JSON.parse(time)[1]}
          </span>
        </div>
        <Button type='primary' style={{ width: '100px', height: '30px' }} onClick={() => navigate(`/course-learning/online/${classId}?roomId=${room_id}`)}>
          {/* <Link to={`/course-learning/online/${classId}?roomId=${room_id}`}>Join</Link> */}
          Join
        </Button>
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
