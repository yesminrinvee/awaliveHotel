import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const ButtonLoginSignUp = () => {
  const items = [
    {
      key: "1",
      label: (
        <Link to={"login"} rel="noopener noreferrer">
          Log In
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/signup"} rel="noopener noreferrer">
          Join
        </Link>
      ),
    },
  ];

  return (
    <div className="py-8 lg:py-6">
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
          >
            <div className="flex  items-center justify-center   cursor-pointer">
              <UserOutlined className="text-xl cursor-pointer px-4 py-1 md:py-0" />
            </div>
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
};

export default ButtonLoginSignUp;
