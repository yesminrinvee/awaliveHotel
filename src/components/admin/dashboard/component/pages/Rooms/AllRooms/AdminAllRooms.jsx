import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import AdminSingleRoom from "./AdminSingleRoom";
import axios from "axios";
import i18next from "i18next";
import { message } from "antd";

const AdminAllRooms = () => {
  const currentLanguage = i18next.language;
  const [AllRooms, setAllRooms] = useState([]);
  const [loadingAllRooms, setLoadingAllRooms] = useState(true);

  const fetchAllRooms = async () => {
    const token = await localStorage.getItem("token");
    if (!token) {
      message.error("No token found, authentication failed.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp < currentTime) {
        message.error("Token has expired.");
        return;
      }

      if (decodedToken.role !== "admin") {
        message.error("You are not authorized to delete this room.");
        return;
      }

      const response = await axios.get(
        `https://server.awalivhotel.com/api/room/admin/room?lang=${currentLanguage}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      let adminRooms = response.data.data;

      setAllRooms(adminRooms);
      setLoadingAllRooms(false);
    } catch (error) {
      console.error("Error fetching room rates:", error);
      setLoadingAllRooms(false);
    }
  };

  useEffect(() => {
    fetchAllRooms();
  }, [currentLanguage]);

  return (
    <section className="max-w-7xl mx-auto py-16 px-2 md:px-0">
      <div className="flex flex-col md:flex-row gap-5">
        <AdminSingleRoom
          allRooms={AllRooms}
          loadingAllRooms={loadingAllRooms}
          setLoadingAllRooms={setLoadingAllRooms}
          onUpdate={fetchAllRooms} // Pass the fetch function as a prop
        />
      </div>
    </section>
  );
};

export default AdminAllRooms;
