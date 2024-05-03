import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EditClassModal from "./EditClassModal";

const SheduleModal = ({ schedules }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (eventInfo) => {
    const event = eventInfo.event;
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
        <span>Lesson: {eventInfo.event.title}</span>

        <span>
          Link: <a href="#">asdasasd</a>
        </span>
      </div>
    );
  };

  return (
    <>
      <EditClassModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <FullCalendar
        eventBackgroundColor="#2C3E50"
        height="85vh"
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={schedules}
        eventClick={handleEventClick}
        eventContent={eventContent}
      />
    </>
  );
};

export default SheduleModal;
