import { Popconfirm, message } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const PermanentDeleteRoomButton = ({onUpdate,roomId}) => {
  

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
  const deleteRoomPermanently = async () => {
    try {
      await axios.delete(`https://server.awalivhotel.com/api/room/${roomId}/permanent`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      message.success("Room deleted permanently.");
      onUpdate(); // Trigger a refetch
    } catch (error) {
      console.error("Error during permanent room deletion:", error.response);
      message.error("Failed to delete the room permanently.");
    }
  };


  
  const confirm = () => {
    
      deleteRoomPermanently();
    
  };
  return (
    <Popconfirm
          title="Warning"
          description="Are you sure you want to delete this room permanently?"
          onConfirm={confirm}
          okText="Delete Permanently"
          cancelText="Cancel"
          placement="left" 
        >
          <button className="hover:bg-slate-50 flex justify-center items-center text-xs uppercase font-semibold text-red-500">
            Delete Permanently
          </button>
        </Popconfirm>
    // <Popconfirm
    //   title="Permanent Delete"
    //   description="Room will Delete forever"
    //   // onConfirm={confirm}
    //   onOpenChange={() => console.log('open change')}
    //   okText="Delete"
    //       cancelText="Cancel"
    // >
    //   <Button type="primary" className='hover:bg-slate-50' style={{color:'white', backgroundColor:'red'}} >Delete</Button>
    // </Popconfirm>


  )
}

export default PermanentDeleteRoomButton