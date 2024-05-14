import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Breadcrumb,
  DatePicker,
  TimePicker,
  Select,
  Tabs,
  Input,
} from "antd";
import SheduleModal from "../../../../components/common/modal/SheduleModal";
import { GenerateSchedules } from "../../../../constants/GenerateSchedules";
import { DateInWeek } from "../../../../constants/DateInWeek";
import { randomID } from "../../../../constants/GenerateRandomID";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import dayjs from "dayjs";

const options = [
  {
    label: "Monday",
    value: "mon",
  },
  {
    label: "Tuesday",
    value: "tue",
  },
  {
    label: "Wednesday",
    value: "wed",
  },
  {
    label: "Thursday",
    value: "thu",
  },
  {
    label: "Friday",
    value: "fri",
  },
  {
    label: "Saturday",
    value: "sat",
  },
  {
    label: "Sunday",
    value: "sun",
  },
];

let initial_duration;
const ClassDetailPage = () => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [courseInfo, setCourseInfo] = useState({
    class_name: "",
    duration: [],
    time: [],
    weekday_selection: [],
    room_id: "",
    schedules: [],
    teacher: "",
    students: [],
  });
  const { api } = useAxios();
  const { id, classId } = useParams();
  const navigate = useNavigate();

  const handleGetUsers = async () => {
    try {
      window.showLoading(true);
      const { data } = await api.get(`/admin/class/get-data/${classId}`);
      const { data: scheduleData } = await api.get(
        `/admin/class-detail/get-data/${classId}`
      );
      const newData = {
        class_name: data.class.class_name,
        duration: JSON.parse(data.class.duration),
        time: JSON.parse(data.class.time),
        students: JSON.parse(data.class.students),
        room_id: data.class.room_id,
        teacher: data.class.teacher,
        schedules: scheduleData.schedules,
        weekday_selection: JSON.parse(data.class.weekday_selection),
      };
      initial_duration = JSON.parse(data.class.duration);
      setCourseInfo(newData);
      window.showLoading(false);
    } catch (error) {
      console.log(error);
      window.showLoading(false);
    }
  };

  const handleDeleteClass = async () => {
    try {
      const { data } = await api.get("/admin/list-user");
      console.log(data, "data");
      setUsers(
        data.users.map((u) => {
          return { label: u.email, value: u.id };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (classId) {
      handleGetUsers();
    }
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const onFinish = async () => {
    if (
      initial_duration[0] !== courseInfo.duration[0] ||
      initial_duration[1] !== courseInfo.duration[1]
    ) {
      console.log("haschange");
    } else {
      console.log("noChange");
    }
    // window.showLoading(true);

    // let schedules = GenerateSchedules(
    //   courseInfo.duration[0],
    //   courseInfo.duration[1],
    //   courseInfo.weekday_selection.map((d) => DateInWeek[d])
    // ).map((s, idx) => {
    //   return {
    //     title: `Lesson ${idx + 1}`,
    //     date: s,
    //     time: `${courseInfo.time[0]}-${courseInfo.time[1]}`
    //   };
    // });
    // const bodyObj = { ...courseInfo, room_id: randomID(5), schedules };
    // try {
    //   const { data } = await api.post('/admin/class/create', {
    //     duration: JSON.stringify(bodyObj.duration),
    //     time: JSON.stringify(bodyObj.time),
    //     weekday_selection: JSON.stringify(bodyObj.weekday_selection),
    //     class_name: bodyObj.class_name,
    //     room_id: bodyObj.room_id,
    //     schedules:  JSON.stringify(schedules),
    //     id_cource: id,
    //     teacher: bodyObj.teacher,
    //     students: JSON.stringify(bodyObj.students),
    //   });
    //   if(data.message === 'Successfully added a new class') {
    //     window.openNoti('Message', 'Successfully added a new class');
    //     // navigate(`/course-manage-content/${id}`)
    //   }
    //   window.showLoading(false);
    // } catch (error) {
    //   window.openNoti('Message', 'Failed to add a new class');
    //   window.showLoading(false);
    // }

    // setCourseInfo({ ...courseInfo, room_id: randomID(5), schedules });
  };

  const handleFormInputChange = (type, value) => {
    setCourseInfo({ ...courseInfo, [type]: value });
  };

  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: (
        <SheduleModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          schedules={courseInfo.schedules}
        />
      ),
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: "15px" }}
        items={[
          {
            title: (
              <a
                type="button"
                onClick={() => navigate(`/course-manage-content/${id}`)}
              >
                Class list
              </a>
            ),
          },
          {
            title: "Class detail",
          },
        ]}
      />
      {(courseInfo.class_name || !classId) && (
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Class name"
            name="class_name"
            rules={[{ required: true }]}
            initialValue={courseInfo.class_name}
          >
            <Input
              style={{
                width: "100%",
              }}
              placeholder="Class name"
              onChange={(e) =>
                handleFormInputChange("class_name", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item
            label="Course duration"
            name="duration"
            rules={[{ required: true }]}
            initialValue={[
              courseInfo.duration[0]
                ? dayjs(courseInfo.duration[0], "YYYY-MM-DD")
                : null,
              courseInfo.duration[1]
                ? dayjs(courseInfo.duration[1], "YYYY-MM-DD")
                : null,
            ]}
          >
            <RangePicker
              style={{ width: "100%" }}
              onChange={(_, val2) => handleFormInputChange("duration", val2)}
              minDate={dayjs(formattedDate, "YYYY-MM-DD")}
            />
          </Form.Item>

          <Form.Item
            label="Class time"
            name="time"
            rules={[{ required: true }]}
            initialValue={[
              courseInfo.time[0] ? dayjs(courseInfo.time[0], "HH:mm") : null,
              courseInfo.time[0] ? dayjs(courseInfo.time[1], "HH:mm") : null,
            ]}
          >
            <TimePicker.RangePicker
              style={{ width: "100%" }}
              onChange={(val, val2) => handleFormInputChange("time", val2)}
              format="HH:mm"
            />
          </Form.Item>

          <Form.Item
            label="Weekday selection"
            name="weekday_selection"
            rules={[{ required: true }]}
            initialValue={courseInfo.weekday_selection}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Select days"
              onChange={(val) =>
                handleFormInputChange("weekday_selection", val)
              }
              options={options}
            />
          </Form.Item>

          <Form.Item
            label="Teacher"
            name="teacher"
            rules={[{ required: true }]}
            initialValue={courseInfo.teacher || null}
          >
            <Select
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Select teacher"
              onChange={(val) => handleFormInputChange("teacher", val)}
              options={users}
            />
          </Form.Item>

          <Form.Item
            label="Students"
            name="students"
            rules={[{ required: true }]}
            initialValue={courseInfo.students || null}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Select students"
              onChange={(val) => handleFormInputChange("students", val)}
              options={users}
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button htmlType="submit" type="primary">
              {classId ? "Update" : "Create"}
            </Button>
          </Form.Item>

          {/* <Tabs defaultActiveKey="1" items={items} /> */}
          <SheduleModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            schedules={courseInfo.schedules}
          />
        </Form>
      )}
    </>
  );
};

export default ClassDetailPage;
