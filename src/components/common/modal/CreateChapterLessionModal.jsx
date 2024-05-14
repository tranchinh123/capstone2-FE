import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Upload, Select, TimePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router";
import dayjs from "dayjs";

const CreateChapterLessonModal = ({
  isModalOpen,
  setIsModalOpen,
  editMode,
  selectedLessonId,
  selectedChapterId,
  getLessons,
}) => {
  const [loading, setLoading] = useState(editMode);
  const [excerciseOptions, setExcerciseOptions] = useState([]);
  const [dataForEditMode, setDataForEditMode] = useState({
    id: null,
    name: "",
    fileList: null,
    length: "",
    excercise: "",
  });
  const [form] = Form.useForm();
  const { api } = useAxios();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/admin/list-excercise");
        console.log(data.excercises, "data");
        setExcerciseOptions(
          data.excercises
            .filter((v) => v.excercise_type === 1)
            .map((v) => {
              return {
                value: v.id,
                label: v.excercise_name,
              };
            })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleGetLessonDetail = async () => {
    try {
      const { data } = await api.get(
        `/admin/lesson/get-data/${selectedLessonId}`
      );
      setDataForEditMode({
        ...dataForEditMode,
        id: data.lesson.id,
        name: data.lesson.lesson_name,
        length: data.lesson.time,
        fileList: [
          { name: data.lesson.lesson_video, url: data.lesson.lesson_video },
        ],
        excercise: data.lesson.id_excercise,
      });
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const createNewLesson = async (name, video, time, id_excercise) => {
    window.showLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", dataForEditMode.id);
      formData.append("lesson_name", name);
      formData.append("lesson_video", video);
      formData.append("time", time);
      if (id_excercise) {
        formData.append("id_excercise", id_excercise);
      }
      formData.append("id_chapter", selectedChapterId);
      formData.append("id_cource", id);
      await api.post(
        `/admin/lesson/${editMode ? "update" : "create"}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.showLoading(false);
      setIsModalOpen(false);
      window.openNoti("Message", "Create new lesson successfully.");
      getLessons();
    } catch (error) {
      console.log(error, "error");
      window.showLoading(false);
      window.openNoti("Message", "Failed to create new lesson.");
    }
  };

  const onFinish = (values) => {
    if (editMode) {
      const file = dataForEditMode.fileList[0].url || values.resource.file;
      createNewLesson(
        values.name,
        file,
        String(values.video_length.$d).split(" ")[4],
        values?.excercise
      );
    } else {
      createNewLesson(
        values.name,
        values.resource.file,
        String(values.video_length.$d).split(" ")[4],
        values?.excercise
      );
    }
  };

  useEffect(() => {
    if (editMode) {
      handleGetLessonDetail();
    }
  }, []);

  console.log(dataForEditMode, "dataForEditMode.excercise");
  return (
    <Modal
      title={`${editMode ? "Update" : "Create"} chapter lesson`}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={() => <></>}
    >
      {loading ? (
        <></>
      ) : (
        <Form
          layout="vertical"
          form={form}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={(errorInfo) => console.log(errorInfo, "errorInfo")}
        >
          <Form.Item
            label="Name of video"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={dataForEditMode.name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Video file"
            name="resource"
            initialValue={dataForEditMode.fileList}
            rules={[
              {
                validator: () => {
                  if (dataForEditMode.fileList.length === 0)
                    return Promise.reject("Please upload video file");
                  if (dataForEditMode.fileList.length > 0)
                    return Promise.resolve();
                },
              },
            ]}
          >
            <Upload
              name="file"
              beforeUpload={() => false}
              // onChange={(info) => console.log(info.file, 'info')}
              style={{ borderColor: "" }}
              maxCount={1}
              onChange={(info) =>
                setDataForEditMode({
                  ...dataForEditMode,
                  fileList: info.fileList,
                })
              }
              fileList={dataForEditMode.fileList}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Video length"
            name="video_length"
            required
            initialValue={
              dataForEditMode.length
                ? dayjs(dataForEditMode.length, "HH:mm:ss")
                : null
            }
          >
            <TimePicker showNow={false} />
          </Form.Item>
          <Form.Item
            label="Excercise"
            name="excercise"
            initialValue={
              dataForEditMode.excercise
                ? { value: dataForEditMode.excercise }
                : null
            }
          >
            <Select
              showSearch
              placeholder="Select excercise"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLocaleLowerCase()
                  .includes(input.toLocaleLowerCase())
              }
              options={excerciseOptions}
            />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button htmlType="submit" type="primary">
              {editMode ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default CreateChapterLessonModal;
