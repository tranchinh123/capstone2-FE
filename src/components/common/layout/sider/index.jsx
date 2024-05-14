import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../contexts/MainContext";
const { Sider } = Layout;

import { FaList, FaRegFileExcel, FaCalendarAlt, FaUser } from "react-icons/fa";
import { LuFileBadge } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";

const AppSider = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const forUser = [
    {
      key: "/courses",
      icon: <FaList />,
      label: "Courses",
      onClick: () => navigate("/courses"),
    },
    {
      key: "/schedule",
      icon: <FaCalendarAlt />,
      label: "Schedule",
      onClick: () => navigate("/schedule"),
    },
    {
      key: "/classes",
      icon: <SiGoogleclassroom />,
      label: "Classes",
      onClick: () => navigate("/classes"),
    },
    {
      key: "/achievements",
      icon: <LuFileBadge />,
      label: "Achievements",
      onClick: () => navigate("/achievements"),
    },
  ];

  const forAdmin = [
    {
      key: "/courses",
      icon: <FaList />,
      label: "Courses",
      onClick: () => navigate("/courses"),
    },
    {
      key: "/materials",
      icon: <FaRegFileExcel />,
      label: "Materials",
      children: [
        {
          key: "/materials/excercise",
          label: "Manage excercises",
          onClick: () => navigate("/excercise"),
        },
        {
          key: "/materials/question",
          label: "Manange questions",
          onClick: () => navigate("/question"),
        },
      ],
    },
    {
      key: "/users",
      icon: <FaUser />,
      label: "Manage users",
      onClick: () => navigate("/users"),
    },
  ];

  return (
    <Sider collapsed={true}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/course"]}
        items={user.role === 1 ? forAdmin : forUser}
      />
    </Sider>
  );
};

export default AppSider;
