// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { Popconfirm, message } from "antd";
import axios from "axios";

const RoomDeleteButton = ({onUpdate , isActive, roomId }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    message.error("No token found, authentication failed.");
    return null;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds

  if (decodedToken.exp < currentTime) {
    message.error("Token has expired.");
    return null;
  }

  if (decodedToken.role !== "admin") {
    message.error("You are not authorized to perform this action.");
    return null;
  }

  const deleteRoom = async () => {
    try {
          await axios.delete(`https://server.awalivhotel.com/api/room/${roomId}`, {
            // await axios.delete(`http://localhost:5000/api/room/${roomId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      message.success("Room deleted successfully.");
      onUpdate()
    } catch (error) {
      console.error("Error during room deletion:", error.response?.data?.issues?.[0]?.message || error.message);
      message.error("Failed to delete the room.");
    }
  };

  const reactivateRoom = async () => {
    try {
      await axios.put(`https://server.awalivhotel.com/api/room/${roomId}/reactivate`, {}, {
    //   await axios.put(`http://localhost:5000/api/room/${roomId}/reactivate`, {}, {
        headers: {
          Authorization: `${token}`,
        },
      });
      message.success("Room reactivated successfully.");
      onUpdate()
    } catch (error) {
      console.error("Error during room reactivation:", error.response?.data?.issues?.[0]?.message || error.message);
      message.error("Failed to reactivate the room.", error);
    }
  };

  const confirm = () => {
    if (isActive) {
      deleteRoom();
    } else {
      reactivateRoom();
    }
  };

  return (
    <>
      {isActive ? (
        <Popconfirm
          title="Warning"
          description="Are you sure you want to deactivate this room?"
          onConfirm={confirm}
          okText="Deactivate"
          cancelText="Cancel"
        >
          <button className="hover:bg-slate-50 flex justify-center items-center text-xs uppercase font-semibold text-red-500">
            Deactivate
          </button>
        </Popconfirm>
      ) : (
        <Popconfirm
          title="Warning"
          description="Are you sure you want to reactivate this room?"
          onConfirm={confirm}
          okText="Reactivate"
          cancelText="Cancel"
        >
          <button className="hover:bg-slate-50 flex justify-center items-center text-xs uppercase font-semibold text-green-500">
            Reactivate
          </button>
        </Popconfirm>
      )}
    </>
  );
};

export default RoomDeleteButton;
