import { useRef, useState } from "react";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import "../../../../style/CustomStyle.css";

const GuestsTable = ({ allGuests, deleteGuest }) => {
  console.log(allGuests);

  const data = allGuests.map((guest, index) => ({
    key: guest._id, // Ensure key is a string
    name: guest.fullName,
    email: guest.email,
    role: guest.role,
    status: guest.isActive,
  }));

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [filteredInfo, setFilteredInfo] = useState({});
  
  const handleChange = (pagination, filters) => {
    console.log("Various parameters", pagination, filters);
    setFilteredInfo(filters);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm, dataIndex) => {
    clearFilters();
    setSearchText("");
    confirm();
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters, confirm, dataIndex)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      filteredValue: filteredInfo.name || null,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...getColumnSearchProps("email"),
      filteredValue: filteredInfo.email || null,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Inactive",
          value: false,
        },
      ],
      render: (status) => (
        <span style={{ color: status ? "green" : "red", fontWeight: 600 }}>{status ? "Active" : "Inactive"}</span>
      ),
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "User",
          value: "user",
        },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => record.role.includes(value),
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "15%",
      render: (text, record) => (
        <Popconfirm
          key={record.key}
          title={`Are you sure you want to delete ${record.name}?`}
          onConfirm={() => deleteGuest(record.key)}
          onCancel={() => console.log("canceled delete")}
          okText="Yes"
          cancelText="No"
          icon={<DeleteOutlined style={{ color: "red" }} />}
        >
          <a href="#" style={{ color: "red" }}>
            Delete
          </a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Top Channels</h4>
      <Table
        className="overflow-x-auto"
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={{ pageSize: 5 }} // Add pagination
      />
    </div>
  );
};

export default GuestsTable;
