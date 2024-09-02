import { Select, Space } from "antd";

// eslint-disable-next-line react/prop-types
const TagSelector = ({handleTags}) => {
  
  return (
    <Space wrap>
      <Select
        defaultValue="Regular"
        style={{
          width: 120,
        }}
        options={[
          {
            value: "Regular",
            label: "Regular",
          },
          // {
          //   value: "Promotion",
          //   label: "Promotion",
          // },
        ]}
        onChange={handleTags}
      />
    </Space>
  );
};

export default TagSelector;
