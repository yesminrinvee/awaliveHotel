/* eslint-disable react/prop-types */
import { Dropdown, Space, message } from "antd";
import { LuAlignCenter } from "react-icons/lu";
import { MoneyCollectOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../../../../../sharedPages/Context/AuthProvider";

// eslint-disable-next-line react/prop-types
const ActionButton = ({ record, fetchBookings, fetchNewBookings }) => {
  // Handler functions for Pay and Cancel
  // API call to handle payment
  const { handleLogout } = useContext(AuthContext);

  const handlePay = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found, please log in.");
      return;
    }
  
    let decodedToken;
    try {
      decodedToken = jwtDecode(token); // Corrected function name to jwtDecode
    } catch (error) {
      message.error("Invalid token.");
      return;
    }
  
    // Check token expiration and admin role
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decodedToken.exp < currentTime) {
      message.error("Session has expired. Please log in again.");
      handleLogout(); 
      return;
    }
  
    if (decodedToken.role !== "admin") {

      message.error("You are not authorized to make this payment.");
      return;
    }
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.patch(
        `https://server.awalivhotel.com/api/booking/markAsPaid/${record.id}`,{},{
        // `https://type-script-server.vercel.app/api/booking/markAsPaid/${record.id}`,{},{
          headers: { Authorization: `${token}` },
        }
        // `http://localhost:5000/api/booking/mark-as-paid/${record.id}`,
        // {
        //   headers: {
        //     Authorization: `${token}` // Using the fetched token
        //   },
        // }
      );
      
      message.success("Payment processed successfully."); // Notification of success
      fetchBookings()
      fetchNewBookings()
      
    } catch (error) {
      console.error("Error during payment:", error.response ? error.response.data : error.message);
      message.error("Payment processing failed."); // Notification of failure
    }
  };

  // API call to handle cancellation
  const handleCancel = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found, please log in.");
      return;
    }
    
    let decodedToken;
    try {
      decodedToken = jwtDecode(token); // Corrected function name to jwtDecode
    } catch (error) {
      message.error("Invalid token.");
      return;
    }
  
    // Check token expiration and admin role
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decodedToken.exp < currentTime) {
      message.error("Session has expired. Please log in again.");
      handleLogout(); 
      return;
    }
  
    if (decodedToken.role !== "admin") {
      message.error("You are not authorized to make this payment.");
      return;
    }
  
    try {
       // `https://type-script-server.vercel.app/api/booking/cancelBooking/${record.id}`,{},
        // `http://localhost:5000/api/booking/cancelBooking/${record.id}`,{},
      // eslint-disable-next-line no-unused-vars
      const response = await axios.patch(
        `https://server.awalivhotel.com/api/booking/cancelBooking/${record.id}`,{},
        {
          headers: {
            Authorization: `${token}` // Using the token from local storage
          },
        }
      );

      message.success("Booking canceled successfully."); // Notification of success
      fetchBookings()
      fetchNewBookings()
    } catch (error) {
      message.error("Failed to cancel booking."); // Notification of failure
    }
  };

  const items = [
    {
      label: "Pay",
      key: "pay",
      icon: <MoneyCollectOutlined />,
      onClick: handlePay,
    },
    {
      label: "Cancel",
      key: "cancel",
      icon: <CloseOutlined />,
      onClick: handleCancel,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottom">
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <LuAlignCenter />
        </Space>
      </a>
    </Dropdown>
  );
};

export default ActionButton;
