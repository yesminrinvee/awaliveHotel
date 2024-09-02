import { Table, Tag, Space, Modal, message } from "antd";
import { useState } from "react";
import { LuMoreHorizontal, LuTrash2 } from "react-icons/lu";
import BookingInfoAdmin from "./BookingInfoAdmin";
import FilterBookingsByDate from "./FilterBookingsByDate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
// import moment from "moment";

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
const AllBookingsAdmin = ({ allBookingData, loading, fetchBookings, setAllBookingData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  // const { t } = useTranslation("booking");

  const showModal = (record) => {
    setSelectedData(record);
    setIsModalVisible(true);
  };

  // const formatDateToSaudi = (dateString) => {
  //   console.log(dateString, 'date string');
  //   try {
  //     const date = moment(dateString, [
  //       moment.ISO_8601,
  //       "MM/DD/YYYY",
  //       "YYYY-MM-DDTHH:mm:ss.SSSZ"
  //     ], true);
  
  //     if (!date.isValid()) {
  //       throw new Error("Invalid date");
  //     }
  
  //     return date.format('D MMMM YYYY');
  //   } catch (error) {
  //     console.error("Error formatting date:", error);
  //     return "Invalid date";
  //   }
  // };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); 
    
    try {
      await axios.delete(`https://server.awalivhotel.com/api/booking/${id}`,{
        headers:{
          Authorization: `${token}`
        }
      });
      message.success("Booking deleted successfully");
      fetchBookings(); // Refresh bookings data
    } catch (error) {
      message.error("Failed to delete booking");
    }
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
      render: (roomImage) => {
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
      filters: generateRoomNameFilters(allBookingData),
      onFilter: (value, record) => record.roomName.startsWith(value),
      filterSearch: true,
      render: (text, record) => <a onClick={() => showInvoice(record)}>{text}</a>
    },
    {
      title: "Reservation Date",
      dataIndex: "reserveDate",
      key: "reserveDate",
      render: (reserveDate) => {
        // let color = payment.toLowerCase() === "pending" ? "volcano" : "green";
        // return <Tag >{formatDateToSaudi(reserveDate)}</Tag>;
        return <Tag >{dayjs(reserveDate).format("MMM D, YYYY")}</Tag>;
        // return <Tag >{reserveDate}</Tag>;
      },
    },
    {
      title: "CheckIn",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (checkIn) => {
        // return <Tag >{checkIn}</Tag>;
        return <Tag >{dayjs(checkIn).format("MMM D, YYYY")}</Tag>;
      },
    },
    {
      title: "CheckOut",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (checkOut) => {
        // return <Tag >{checkOut}</Tag>;
        return <Tag >{dayjs(checkOut).format("MMM D, YYYY")}</Tag>;
      },
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
      dataIndex: "status",
      key: "status",
      filters: generateBookingStatusFilters(allBookingData),
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
          <LuMoreHorizontal onClick={() => showModal(record)} className="text-lg cursor-pointer text-yellow-600" title="Full Info" />
          <LuTrash2 onClick={() => {
            Modal.confirm({
              title: "Are you sure you want to delete this booking?",
              onOk: () => handleDelete(record.id),
            });
          }} className="text-lg cursor-pointer text-red-400" title="Delete" />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="py-6">
        <FilterBookingsByDate fetchBookings={fetchBookings} setAllBookingData={setAllBookingData} allBookingData={allBookingData} />
      </div>
      <div>
        {loading ? (
          <div className="min-h-[400px] w-full flex justify-center items-center ">
            <p>Loading....</p>
          </div>
        ) : (
          <Table scroll={{ x: "max-content" }} columns={columns} dataSource={allBookingData} pagination={{ pageSize: 5 }} size="small" />
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

export default AllBookingsAdmin;
