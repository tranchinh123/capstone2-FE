import { Modal } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const SheduleModal = ({ isModalOpen, setIsModalOpen, schedules }) => {
    const handleEventClick = (eventInfo) => {
        const event = eventInfo.event;
        console.log('Clicked event:', event.title);
    };

    const eventContent = (eventInfo) => {
        return (
            <div
                style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}
            >
                <span>Lesson: {eventInfo.event.title}</span>
                <span>Time: {eventInfo.event.extendedProps.time}</span>
                <span>Instuctor: Jhon Doe</span>
                <span>
                    Link: <a href="#">asdasasd</a>
                </span>
            </div>
        );
    };

    return (
        // <Modal
        //     title="Schedules"
        //     open={isModalOpen}
        //     onCancel={() => setIsModalOpen(false)}
        //     footer={() => <></>}
        //     style={{
        //         top: 20
        //     }}
        //     width="90%"
        // >
            <FullCalendar
                eventBackgroundColor="#2C3E50"
                height="85vh"
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={schedules}
                eventClick={handleEventClick}
                eventContent={eventContent}
            />
        // </Modal>
    );
};

export default SheduleModal;