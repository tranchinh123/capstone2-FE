import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EditClassModal from "./EditClassModal";

const SheduleModal = ({
  schedules,
  handleGetCourseInfo,
  courseInfo,
  isFromSchedulePage = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleEventClick = (eventInfo) => {
    if (isFromSchedulePage) return;
    setSelectedLesson(eventInfo.event);
    setIsModalOpen(true);
  };

  const eventContent = (eventInfo) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontWeight: "bold",
          padding: "5px",
        }}
      >
        <span>
          <span style={{ color: "#61BCFF" }}>Lesson: </span>
          {eventInfo.event.title}
        </span>
        <span>
          <span style={{ color: "#61BCFF" }}>RoomID: </span>
          {courseInfo?.room_id}
        </span>
      </div>
    );
  };

  return (
    <>
      {selectedLesson && (
        <EditClassModal
          selectedLesson={selectedLesson}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setSelectedLesson={setSelectedLesson}
          handleEventClick={handleEventClick}
          handleGetCourseInfo={handleGetCourseInfo}
        />
      )}
      <FullCalendar
        event
        eventBackgroundColor="#2C3E50"
        height="85vh"
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={schedules}
        eventClick={handleEventClick}
        eventContent={eventContent}
        eventResizableFromStart
        dayMaxEventRows={3}
      />
    </>
  );
};

export default SheduleModal;
