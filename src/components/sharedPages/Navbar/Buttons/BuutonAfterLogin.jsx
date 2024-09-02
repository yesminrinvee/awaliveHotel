import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const ButtonAfterLogin = ({ userName, handleLogout }) => {
  const items = [
    {
      key: "1",
      label: <p rel="noopener noreferrer">{userName}</p>,
    },
    {
      key: "2",
      label: (
        <p rel="noopener noreferrer" onClick={handleLogout}>
          log out
        </p>
      ),
    },
  ];

  return (
    <div className="">
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
          >
            <div className="flex  items-center justify-center px-4 cursor-pointer">
              <UserOutlined className="text-lg " />
              {/* <p className="cursor-pointer text-md flex items-center"></p> */}
              {/* <DownOutlined className="text-xs" /> */}
            </div>
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
};

export default ButtonAfterLogin;
