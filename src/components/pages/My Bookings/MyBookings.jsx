import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
// import BannerPage from "../../sharedPages/PageBanner/BannerPage";
import { message } from "antd";
import axios from "axios";
import BookedRooms from "./BookedRooms";
import i18next from "i18next";
import PageAnimation from "../../PageAnimation/PageAnimation";
import MyBookingBanner from "./MyBookingBanner";

const MyBookings = () => {
  const currentLanguage = i18next.language;
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [bookedRooms, setBookedRooms] = useState([]);

 

  useEffect(() => {
    if (!user) {
      
      message.info('Please Log In')
      setLoading(false);
      return;
    }

    const fetchUserOrders = async () => {
      try {
        const userEmail = user?.email;
        const userToken = localStorage.getItem("token");

        const response = await axios.get(
          `https://server.awalivhotel.com/api/booking/${userEmail}?lang=${currentLanguage}`,
          // `https://type-script-server.vercel.app/api/booking/${userEmail}?lang=${currentLanguage}`,
          // `http://localhost:5000/api/booking/${userEmail}?lang=${currentLanguage}`,
          {
            headers: {
              Authorization: `${userToken}`,
              // 'Accept-Language': currentLanguage,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data.data);
          setBookedRooms(response.data.data);

          // notification["success"]({
          //   message: response.data.message,
          //   description: response.data.message,
          //   placement: "topRight",
          //   duration: 3.5,
          // });
          message.success(response.data.message)
        } else {
          // notification["error"]({
          //   message: "Failed to fetch user orders",
          //   description: "Failed to fetch user orders",
          //   placement: "topRight",
          //   duration: 3.5,
          // });
          message.error("Failed to fetch user orders")
        }
      } catch (error) {
        console.log(error,'errom my bookings');
        let errorMessage = "Please Login";

        // Check if it's an Axios error with a response
        if (error.isAxiosError && error.response) {
          // Check if the error response has a data field with issues
          if (error.response.data && error.response.data.issues) {
            const issues = error.response.data.issues;
            if (issues.length > 0 && issues[0].message) {
              errorMessage = issues[0].message;
            }
          } else if (error.response.data && error.response.data.message) {
            // If there are no issues but a message field is present
            errorMessage = error.response.data.message;
          } else {
            // Default message from response statusText
            errorMessage = error.response.statusText || errorMessage;
          }
        } else {
          // For non-Axios errors (like network errors)
          errorMessage = error.message || "An unexpected error occurred.";
        }

        // notification["error"]({
        //   message: errorMessage,
        //   description: errorMessage,
        //   placement: "topRight",
        //   duration: 3.5,
        // });
        message.error(errorMessage)
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user, currentLanguage]);

  return (
    <>
    <PageAnimation>
      {/* <BannerPage text={t("myBooking")} /> */}
      <MyBookingBanner />
      <BookedRooms loading={loading} bookedData={bookedRooms} />
    </PageAnimation>
    </>
  );
};

export default MyBookings;
