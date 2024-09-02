import { Table, Tag, Space, Spin, } from "antd";
import { useState } from "react";
import {  LuMoreHorizontal, } from "react-icons/lu";
import FilterBookingsByDate from "./FilterBookingsByDate";
import BookingInfoAdmin from "./BookingInfoAdmin";
import ActionButton from "./ActionButton";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// Extract unique room names to create filters dynamically
const generateRoomNameFilters = (data) => {
  const uniqueRoomNames = [...new Set(data.map((item) => item.roomName))];
  return uniqueRoomNames.map((name) => ({
    text: name,
    value: name,
  }));
};

// Extract unique room names to create filters dynamically
const generateBookingStatusFilters = (data) => {
  const uniqueBookingStatus = [...new Set(data.map((item) => item.status))];
  return uniqueBookingStatus.map((status) => ({
    text: status,
    value: status,
  }));
};

// eslint-disable-next-line react/prop-types
const NewBookingsAdmin = ({ allNewBookingData, newLoading, fetchNewBookings, setAllNewBookingData, fetchBookings }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  // const { t } = useTranslation("booking");


  const showModal = (record) => {
    setSelectedData(record);
    setIsModalVisible(true);
  };

  const showInvoice = (record) => {
    // Navigate to the invoice route with a parameter, if necessary
    navigate(`/dashboard/booking/invoice/${record.id}`);  // Assuming record.id is how you identify bookings
  };

 

  const columns = [
    {
      title: "Room",
      dataIndex: "roomImage",
      key: "roomImage",
      // sorter: (a, b) => a.id - b.id,
      render: (roomImage) => {
        // Fallback to a default image if no valid URL is provided
        const defaultImage = "https://via.placeholder.com/100"; // Placeholder image or your default URL
        const imageURL = roomImage || defaultImage;
        return (
          <img
            src={imageURL}
            alt="Room"
            style={{ width: 50, height: "auto", borderRadius: 4 }}
            onError={(e) => {
              e.target.src = defaultImage; // Fallback in case of a broken URL
            }}
          />
        );
      },
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      // sorter: (a, b) => a.roomName.localeCompare(b.roomName),
      // filters: roomNameFilters,
      filters: generateRoomNameFilters(allNewBookingData),
      onFilter: (value, record) => record.roomName.startsWith(value),
      filterSearch: true,
      render: (text, record) => <a onClick={() => showInvoice(record)}>{text}</a>
    },
    {
      title: "Reservation Date",
      dataIndex: "reserveDate",
      key: "reserveDate",
      render: (reserveDate) => {
        return <Tag >{dayjs(reserveDate).format("MMM D, YYYY")}</Tag>;
      },
    },
    {
      title: "CheckIn",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (checkIn) => {
        return <Tag >{dayjs(checkIn).format("MMM D, YYYY")}</Tag>;
      },
    },
    {
      title: "CheckOut",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (checkOut) => {
        return <Tag >{dayjs(checkOut).format("MMM D, YYYY")}</Tag>;
      }
    },

    
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => {
        let color = payment.toLowerCase() === "pending" ? "volcano" : "green";
        return <Tag color={color}>{payment.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Booking Status",
      dataIndex: "status", // Correctly referencing 'status' as defined in transformData
      key: "status",
      filters: generateBookingStatusFilters(allNewBookingData),
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      render: (status) => {
        let Status = status.toLowerCase();
        let color;

        if (Status === "booked") {
          color = "green";
        } else if (Status === "cancelled") {
          color = "yellow";
        } else if (Status === "completed") {
          color = "volcano";
        } else {
          color = "default"; // This is a fallback color, if the statuses are not matched
        }

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Guests",
      dataIndex: "guests",
      key: "guests",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          {/* <LuFileEdit onClick={() => showModal(record)} className='text-lg cursor-pointer text-yellow-600' /> */}
          <LuMoreHorizontal onClick={() => showModal(record)} className="text-lg cursor-pointer text-yellow-600" title="Full Info" />
          <ActionButton record={record} fetchNewBookings={fetchNewBookings} fetchBookings={fetchBookings} />
        </Space>
      ),
    },
  ];

  // console.log(allNewBookingData,'');
  return (
    <>
      <div className="py-6">
        <FilterBookingsByDate
          fetchBookings={fetchNewBookings}
          setAllBookingData={setAllNewBookingData}
          allBookingData={allNewBookingData}
        />
      </div>
      <div>
        {newLoading ? (
          <div className="h-40 flex justify-center items-center"><Spin /></div>
        ) : (
          <Table 
          
          scroll={{ x: "max-content" }}
          columns={columns}
          dataSource={allNewBookingData}
          pagination={{ pageSize: 5 }} 
          size="small"
          
          
          />
        )}
      </div>
      <BookingInfoAdmin
        selectedData={selectedData}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        showModal={showModal}
      />
    </>
  );
};

export default NewBookingsAdmin;
