import { Table } from 'antd';

const columns = [
  {
    title: '#',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: image => <img src={image} alt="Room" style={{ width: 50, height: 50 }} />
  },
  {
    title: 'Item',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Unit Cost',
    dataIndex: 'unitCost',
    key: 'unitCost',
    render: text => `$${text.toFixed(2)}`, // Assuming the unit cost is a number
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: text => `$${text.toFixed(2)}`, // Assuming the total is calculated or provided
  },
];



const InvoiceTable = ({bookedRooms}) => {
  
  // console.log(total,'details');

  if (!bookedRooms) {
    return <div>Loading...</div>; // Or handle this case appropriately
  }

  const data = [
    {
      key: '1',
      image:  bookedRooms.roomId.images[0] || 'https://via.placeholder.com/50', // Replace with actual image URLs
      name:bookedRooms.roomId.title,
      message: bookedRooms.guestData.message,
      quantity: 1,
      unitCost: bookedRooms.roomId.priceOptions[0].price,
      total:  bookedRooms.invoiceDetails.subtotal
      ,
    },
  ];

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img src={image} alt="Room" style={{ width: 50, height: 50 }} />
    },
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Cost',
      dataIndex: 'unitCost',
      key: 'unitCost',
      render: text => `SAR ${text.toFixed(2)}`,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: text => `SAR ${text.toFixed(2)}`,
    },
  ];

  

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} bordered  />
    </div>
  );
};

export default InvoiceTable;
