import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Breadcrumb,
  DatePicker,
  TimePicker,
  Select,
  Input,
  Tooltip,
} from "antd";
import SheduleModal from "../../../../components/common/modal/SheduleModal";
import { GenerateSchedules } from "../../../../constants/GenerateSchedules";
import { DateInWeek } from "../../../../constants/DateInWeek";
import { randomID } from "../../../../constants/GenerateRandomID";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import { CiWarning } from "react-icons/ci";
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
let initial_weekday;
const ClassDetailPage = () => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
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

  const handleGetCourseInfo = async () => {
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
      initial_weekday = JSON.parse(data.class.weekday_selection);
      setCourseInfo(newData);
      window.showLoading(false);
    } catch (error) {
      console.log(error);
      window.showLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await api.get("/admin/list-user");
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
      handleGetCourseInfo();
    }
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const onFinish = async () => {
    let status;
    const hasChangeOnWeekday =
      JSON.stringify(initial_weekday) ===
      JSON.stringify(courseInfo.weekday_selection);
    console.log(hasChangeOnWeekday, "has");

    if (courseInfo.students.includes(courseInfo.teacher)) {
      window.openNoti(
        "Message",
        "Can not set a user is both a teacher and a student."
      );
      return;
    }

    if (
      initial_duration[0] !== courseInfo.duration[0] ||
      initial_duration[1] !== courseInfo.duration[1]
    ) {
      status = "haschange";
    } else {
      status = "noChange";
    }
    if (classId) {
      onUpdate(status);
      return;
    }

    window.showLoading(true);
    let schedules = GenerateSchedules(
      courseInfo.duration[0],
      courseInfo.duration[1],
      courseInfo.weekday_selection.map((d) => DateInWeek[d])
    ).map((s, idx) => {
      return {
        title: `Lesson ${idx + 1}`,
        date: s,
      };
    });
    const bodyObj = { ...courseInfo, room_id: randomID(5), schedules };
    try {
      const { data } = await api.post("/admin/class/create", {
        duration: JSON.stringify(bodyObj.duration),
        time: JSON.stringify(bodyObj.time),
        weekday_selection: JSON.stringify(bodyObj.weekday_selection),
        class_name: bodyObj.class_name,
        room_id: bodyObj.room_id,
        schedules: JSON.stringify(schedules),
        id_cource: id,
        teacher: bodyObj.teacher,
        students: JSON.stringify(bodyObj.students),
      });
      if (data.message === "Successfully added a new class") {
        window.openNoti("Message", "Successfully added a new class");
        navigate(`/course-manage-content/${id}`);
      }
      window.showLoading(false);
    } catch (error) {
      window.openNoti("Message", "Failed to add a new class");
      window.showLoading(false);
    }
    setCourseInfo({ ...courseInfo, room_id: randomID(5), schedules });
  };

  const onUpdate = async (status) => {
    let schedules = courseInfo.schedules;
    if (status === "haschange") {
      schedules = GenerateSchedules(
        courseInfo.duration[0],
        courseInfo.duration[1],
        courseInfo.weekday_selection.map((d) => DateInWeek[d])
      ).map((s, idx) => {
        return {
          title: `Lesson ${idx + 1}`,
          date: s,
        };
      });
    }

    const bodyObj = { ...courseInfo, schedules };
    try {
      await api.post("/admin/class/update", {
        id: classId,
        duration: JSON.stringify(bodyObj.duration),
        time: JSON.stringify(bodyObj.time),
        weekday_selection: JSON.stringify(bodyObj.weekday_selection),
        class_name: bodyObj.class_name,
        room_id: bodyObj.room_id,
        id_cource: id,
        teacher: bodyObj.teacher,
        students: JSON.stringify(bodyObj.students),
        schedules: JSON.stringify(bodyObj.schedules),
        updated_duration: status === "haschange" ? 1 : 0,
      });
      handleGetCourseInfo();
      window.openNoti("Message", "Update course successfully.");
    } catch (error) {
      window.openNoti("Message", "Failed to update course.");
    }
  };

  const handleFormInputChange = (type, value) => {
    setCourseInfo({ ...courseInfo, [type]: value });
  };

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
            label={
              <div style={{ display: "flex", gap: "5px" }}>
                <span>Course duration</span>
                {classId && (
                  <Tooltip title="Edit duration can change schedules and cause information to be lost">
                    <CiWarning />
                  </Tooltip>
                )}
              </div>
            }
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
            label={
              <div style={{ display: "flex", gap: "5px" }}>
                <span>Weekday selection</span>
                {classId && (
                  <Tooltip title="Edit weekday selection can change schedules and cause information to be lost">
                    <CiWarning />
                  </Tooltip>
                )}
              </div>
            }
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
            schedules={courseInfo.schedules}
            handleGetCourseInfo={handleGetCourseInfo}
            courseInfo={courseInfo}
          />
        </Form>
      )}
    </>
  );
};

export default ClassDetailPage;
