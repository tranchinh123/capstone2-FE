import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EditClassModal from "./EditClassModal";

const a = [
  {
    id: 8,
    duration: '["2024-04-30","2024-05-30"]',
    class_name: "class 1",
    time: '["03:03","05:05"]',
    weekday_selection: '["wed","fri"]',
    room_id: "JvUpT",
    id_cource: 4,
    teacher: 4,
    students: "[8]",
    id_excercises: "[1]",
    created_at: "2024-04-30T03:07:04.000000Z",
    updated_at: "2024-04-30T03:07:04.000000Z",
    title: "Lesson 1",
    date: "2024-05-01",
    link: null,
  },
  {
    id: 8,
    duration: '["2024-04-30","2024-05-30"]',
    class_name: "class 1",
    time: '["03:03","05:05"]',
    weekday_selection: '["wed","fri"]',
    room_id: "JvUpT",
    id_cource: 4,
    teacher: 4,
    students: "[8]",
    id_excercises: "[1]",
    created_at: "2024-04-30T03:07:04.000000Z",
    updated_at: "2024-04-30T03:07:04.000000Z",
    title: "Lesson 2",
    date: "2024-05-03",
    link: null,
  },
  {
    id: 8,
    duration: '["2024-04-30","2024-05-30"]',
    class_name: "class 1",
    time: '["03:03","05:05"]',
    weekday_selection: '["wed","fri"]',
    room_id: "JvUpT",
    id_cource: 4,
    teacher: 4,
    students: "[8]",
    id_excercises: "[1]",
    created_at: "2024-04-30T03:07:04.000000Z",
    updated_at: "2024-04-30T03:07:04.000000Z",
    title: "Lesson 3",
    date: "2024-05-08",
    link: null,
  },
  {
    id: 8,
    duration: '["2024-04-30","2024-05-30"]',
    class_name: "class 1",
    time: '["03:03","05:05"]',
    weekday_selection: '["wed","fri"]',
    room_id: "JvUpT",
    id_cource: 4,
    teacher: 4,
    students: "[8]",
    id_excercises: "[1]",
    created_at: "2024-04-30T03:07:04.000000Z",
    updated_at: "2024-04-30T03:07:04.000000Z",
    title: "Lesson 4",
    date: "2024-05-10",
    link: null,
  },
  {
    id: 8,
    duration: '["2024-04-30","2024-05-30"]',
    class_name: "class 1",
    time: '["03:03","05:05"]',
    weekday_selection: '["wed","fri"]',
    room_id: "JvUpT",
    id_cource: 4,
    teacher: 4,
    students: "[8]",
    id_excercises: "[1]",
    created_at: "2024-04-30T03:07:04.000000Z",
    updated_at: "2024-04-30T03:07:04.000000Z",
    title: "Lesson 5",
    date: "2024-05-15",
    link: null,
  },
  {
    id: 8,
    duration: '["2024-04-30","2024-05-30"]',
    class_name: "class 1",
    time: '["03:03","05:05"]',
    weekday_selection: '["wed","fri"]',
    room_id: "JvUpT",
    id_cource: 4,
    teacher: 4,
    students: "[8]",
    id_excercises: "[1]",
    created_at: "2024-04-30T03:07:04.000000Z",
    updated_at: "2024-04-30T03:07:04.000000Z",
    title: "Lesson 6",
    date: "2024-05-17",
    link: null,
  },
  {
    id: 8,
    duration: '["2024-04-30","2024-05-30"]',
    class_name: "class 1",
    time: '["03:03","05:05"]',
    weekday_selection: '["wed","fri"]',
    room_id: "JvUpT",
    id_cource: 4,
    teacher: 4,
    students: "[8]",
    id_excercises: "[1]",
    created_at: "2024-04-30T03:07:04.000000Z",
    updated_at: "2024-04-30T03:07:04.000000Z",
    title: "Lesson 7",
    date: "2024-05-22",
    link: null,
  },
  {
    id: 8,
    duration: '["2024-04-30","2024-05-30"]',
    class_name: "class 1",
    time: '["03:03","05:05"]',
    weekday_selection: '["wed","fri"]',
    room_id: "JvUpT",
    id_cource: 4,
    teacher: 4,
    students: "[8]",
    id_excercises: "[1]",
    created_at: "2024-04-30T03:07:04.000000Z",
    updated_at: "2024-04-30T03:07:04.000000Z",
    title: "Lesson 8",
    date: "2024-05-24",
    link: null,
  },
  {
    id: 8,
    duration: '["2024-04-30","2024-05-30"]',
    class_name: "class 1",
    time: '["03:03","05:05"]',
    weekday_selection: '["wed","fri"]',
    room_id: "JvUpT",
    id_cource: 4,
    teacher: 4,
    students: "[8]",
    id_excercises: "[1]",
    created_at: "2024-04-30T03:07:04.000000Z",
    updated_at: "2024-04-30T03:07:04.000000Z",
    title: "Lesson 9",
    date: "2024-05-29",
    link: null,
  },
];

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
