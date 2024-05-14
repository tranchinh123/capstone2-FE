import { useState, useEffect } from "react";
import BadgeCard from "../../components/common/badge-card";
import { Flex } from "antd";
import useAxios from "../../hooks/useAxios";

const AchievementsPage = () => {
  const [cert, setCert] = useState([]);
  const { api } = useAxios();

  const getCertificate = async () => {
    try {
      const { data } = await api.get("/user/list-certificate");
      setCert(data.certificates);
      console.log(data, "data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCertificate();
  }, []);

  return (
    <div style={{ height: "80vh", overflowY: "scroll" }}>
      <Flex wrap="wrap" gap="small">
        {cert.map((item, idx) => (
          <BadgeCard
            item={item}
            key={idx}
            description={
              <div style={{ display: "flex", gap: "3px" }}>
                <span style={{ fontWeight: "bold" }}>Course:</span>
                <span>{item.cource_name}</span>
              </div>
            }
          />
        ))}
      </Flex>
    </div>
  );
};

export default AchievementsPage;
