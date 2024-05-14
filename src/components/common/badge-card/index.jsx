import { Card } from "antd";
import { Tooltip } from "antd";
import { FiAlertCircle } from "react-icons/fi";
const { Meta } = Card;

const BadgeCard = ({ item, description }) => {
  return (
    <Card
      extra={
        <Tooltip
          style={{ position: "absolute", top: "0px", right: "0px" }}
          title={
            <>
              <ul>
                <li>{`Start date: ${item.date_range}`}</li>
                <li>{`Expire date: ${item.date_expired}`}</li>
              </ul>
            </>
          }
        >
          <FiAlertCircle />
        </Tooltip>
      }
      hoverable
      style={{
        width: 240,
        paddingTop: "10px",
        position: "relative",
      }}
      cover={
        <img src="https://cdn-icons-png.freepik.com/512/3135/3135783.png" />
      }
    >
      <Meta description={description} />
    </Card>
  );
};

export default BadgeCard;
