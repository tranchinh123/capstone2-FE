import { useState } from 'react';
import { Button, Form, Breadcrumb, DatePicker, TimePicker, Select } from 'antd';
import SheduleModal from '../../../components/common/modal/SheduleModal';
import { GenerateSchedules } from '../../../constants/GenerateSchedules';
import { DateInWeek } from '../../../constants/DateInWeek';
import { useGenerateKitToken } from '../../../hooks/useGenerateKitToken';
import dayjs from 'dayjs';

const options = [
  {
    label: 'Monday',
    value: 0
  },
  {
    label: 'Tuesday',
    value: 1
  },
  {
    label: 'Wednesday',
    value: 2
  },
  {
    label: 'Thursday',
    value: 3
  },
  {
    label: 'Friday',
    value: 4
  },
  {
    label: 'Saturday',
    value: 5
  },
  {
    label: 'Sunday',
    value: 6
  }
];

const OnlineCourseManageContent = () => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [courseInfo, setCourseInfo] = useState({
    duration: [],
    time: [],
    weekdaySelection: [],
    kitToken: ''
  });
  const { generateKitToken } = useGenerateKitToken('Simon');

  const onFinish = () => {
    let schedules = GenerateSchedules(
      courseInfo.duration[0],
      courseInfo.duration[1],
      courseInfo.weekdaySelection.map((d) => DateInWeek[d])
    ).map((s, idx) => {
      return {
        title: `Lesson ${idx + 1}`,
        date: s,
        time: `${courseInfo.time[0]}-${courseInfo.time[1]}`
      };
    });
    const { kitToken, roomID } = generateKitToken();

    setCourseInfo({ ...courseInfo, kitToken, roomID });
    setSchedules(schedules);
  };

  const handleFormInputChange = (type, value) => {
    setCourseInfo({ ...courseInfo, [type]: value });
  };
  console.log(courseInfo, 'courseInfo');
  return (
    <>
      <SheduleModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        schedules={schedules}
      />
      <Breadcrumb
        style={{ marginBottom: '15px' }}
        items={[
          {
            title: 'Home'
          },
          {
            title: <a href="">Application Center</a>
          },
          {
            title: <a href="">Application List</a>
          },
          {
            title: 'An Application'
          }
        ]}
      />
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Course duration"
          name="duration"
          rules={[{ required: true }]}
        >
          <RangePicker
            style={{ width: '70%' }}
            onChange={(_, val2) => handleFormInputChange('duration', val2)}
          // defaultValue={[
          //   dayjs('2015-01-01', 'YYYY/MM/DD'),
          //   dayjs('2018-01-01', 'YYYY/MM/DD')
          // ]}
          />
        </Form.Item>

        <Form.Item label="Class time" name="time" rules={[{ required: true }]}>
          <TimePicker.RangePicker
            style={{ width: '70%' }}
            onChange={(val, val2) => handleFormInputChange('time', val2)}
            format="HH:mm"
          // defaultValue={[dayjs('12:08', 'HH:mm'), dayjs('13:08', 'HH:mm')]}
          />
        </Form.Item>

        <Form.Item
          label="Weekday selection"
          name="weekdaySelection"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '70%'
            }}
            placeholder="Please select"
            // defaultValue={['a10', 'c12']}
            onChange={(val) => handleFormInputChange('weekdaySelection', val)}
            options={options}
          />
        </Form.Item>
        <Button type="link" onClick={() => setIsModalOpen(true)}>
          Show detail schedules
        </Button>

        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default OnlineCourseManageContent;