import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { useAppContext } from "../../../contexts/MainContext";
import VideoCallMeeting from "./VideoCallMeeting";

const OnlineCourseLearning = () => {
  const [loading, setLoading] = useState(true);
  const [notAllowToJoin, setNotAllowToJoin] = useState(true);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { api } = useAxios();
  const { user } = useAppContext();

  useEffect(() => {
    (async () => {
      try {
        window.showLoading(true);
        const { data } = await api.get(`/admin/class/get-data/${id}`);
        console.log(data, "data");
        if (JSON.parse(data.class.students).includes(user.id)) {
          setNotAllowToJoin(false);
        } else if (data.class.teacher === user.id) {
          setNotAllowToJoin(false);
        } else {
          setNotAllowToJoin(true);
        }
        setLoading(false);
        window.showLoading(false);
      } catch (error) {
        setLoading(false);
        window.showLoading(false);
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {!loading && (
        <VideoCallMeeting
          name={user.name}
          token={searchParams.get("roomId")}
          notAllowToJoin={notAllowToJoin}
        />
      )}
    </>
  );
};

export default OnlineCourseLearning;
