import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../../../../../public/img/awalive-Blaack.png";
import InvoiceTable from "./InvoiceTable";
import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import i18next from "i18next";
import dayjs from "dayjs";

const Invoice = () => {
  const navigate = useNavigate();
  const currentLanguage = i18next.language;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    if (!id) {
      navigate("/dashboard/room/all-bookings");
      message.error("Error in finding booking id");
      return;
    }

    const fetchUserOrders = async () => {
      try {
        const bookingId = id;
        const userToken = localStorage.getItem("token");

        const response = await axios.get(
          `https://server.awalivhotel.com/api/booking/invoice/${bookingId}?lang=${currentLanguage}`,
          // `http://localhost:5000/api/booking/invoice/${bookingId}?lang=${currentLanguage}`,
          {
            headers: {
              Authorization: `${userToken}`,
            },
          }
        );
        if (response.status === 200) {
          setBookedRooms(response.data.data);
          message.success(response.data.message);
        } else {
          message.error("Failed to fetch user orders");
        }
      } catch (error) {
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

        message.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [id, currentLanguage, navigate]);

  
  if (loading) {
    return <div className="h-screen flex justify-center items-center"><Spin /></div>; // Or handle this case appropriately
  }

  return (
    <>
      <section className="max-w-5xl mx-auto border">
        <div className="p-6">
          <div className="flex flex-row justify-end items-center pb-4 border-b">
            {bookedRooms.paymentStatus === "Pending" ? (
              <div className="flex gap-4 items-center justify-center">
                <button className="py-2 px-4 text-xs">Payment :</button>
                <button className="border py-2 px-4 bg-red-300 rounded-md text-xs">
                  {bookedRooms.paymentStatus}
                </button>
              </div>
            ) : (
              <div className="flex gap-4 items-center justify-center">
                <button className="border py-2 px-4 bg-green-300 rounded-md text-xs">Save</button>
                <button className="border py-2 px-4 bg-red-300 rounded-md text-xs">Print</button>
              </div>
            )}
          </div>
          {/* header start */}
          <div className="flex justify-start items-center">
            <div className="py-4">
              <img src={logo} alt="awalive-hotel-logo" className="h-24 max-w-32" />
            </div>
          </div>
          {/* header end */}
          {/* dates start */}
          <div className="py-6 bg-pink-100 rounded-md">
            <div className="flex justify-around text-xs">
              <div>
                <p>Booking Number</p>
                <p className="font-semibold">{bookedRooms?.bookingNumber}</p>
              </div>
              <div>
                <p>Reservation Date</p>
                <p className="font-semibold">{dayjs(bookedRooms?.createdAt).format("MMM D, YYYY")}</p>
              </div>
              {/* <div>
                <p>Amount</p>
                <p className="font-semibold">SAR {bookedRooms?.invoiceDetails?.total}</p>
              </div> */}
              <div>
                <p>CheckIn</p>
                <p className="font-semibold">{dayjs(bookedRooms?.checkIn).format("MMM D, YYYY")}</p>
              </div>
              <div>
                <p>CheckOut</p>
                <p className="font-semibold">{dayjs(bookedRooms?.checkOut).format("MMM D, YYYY")}</p>
              </div>
            </div>
          </div>
          {/* dates end */}
          <div className="min-h-40 rounded-md mt-3">
            <InvoiceTable bookedRooms={bookedRooms} />
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Invoice;
