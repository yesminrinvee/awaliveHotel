import { useEffect, useState } from "react";
import AllBookingsAdmin from "./AllBookingsAdmin"
import i18next from "i18next";
import axios from "axios";
import NewBookingsAdmin from "./NewBookingsAdmin";

const AdminBookings = () => {
  const [allBookingData, setAllBookingData] = useState([]);
  const [allNewBookingData, setAllNewBookingData] = useState([]);
  // const [dates, setDates] = useState([]);
  const [newLoading, setNewLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentLanguage = i18next.language;
  

  const transformData = (data) => {
    return data.map((item, index) => ({
      key: index + 1,
      id: item._id,
      roomImage: item.roomId?.images[0] ?? "N/A",
      roomName: item.roomId?.title ?? "Unknown", // Safeguard in case `roomId` or `title` is missing
      checkIn: item?.checkIn,
      checkOut: item?.checkOut,
      payment: item?.paymentStatus,
      amount: item?.roomId?.priceOptions?.[0]?.price ?? "N/A", // Safeguard in case price is not available
      // roomNo: item.roomId?._id ?? "N/A", // Adjust this field according to your needs
      guests: `${item?.numberOfGuests} Guests`,
      guestEmail: item?.userId,
      status: item?.bookingStatus,
      firstName: item?.guestData?.firstName,
      lastName: item?.guestData?.lastName,
      email: item?.guestData?.email,
      phone: item?.guestData?.phone,
      guestNote: item?.guestData?.message,
      address: item?.guestData?.address,
      city: item?.guestData?.city,
      arrivalTime: item?.guestData?.arrivalTime,
      reserveDate: item?.createdAt
      // guestData.email,
      // guestData.phone,
      // guestData.message,
      // guestData.address,
      // guestData.arrivalTime,
      // guestData.city,
    }));
  };

  const fetchNewBookings = async () => {
    setNewLoading(true); // Start loading before the request
    try {
      const response = await axios.get(`https://server.awalivhotel.com/api/booking/new?lang=${currentLanguage}`, {
      // const response = await axios.get(`https://type-script-server.vercel.app/api/booking/new?lang=${currentLanguage}`, {
      // const response = await axios.get(`http://localhost:5000/api/booking/new?lang=${currentLanguage}`, {
      
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      const transformedData = transformData(response?.data?.data);
      setAllNewBookingData(transformedData);
      } catch (error) {
        // Optionally handle the error, e.g., by setting an error message in state
        console.log(error,'errr');
        } finally {
          setNewLoading(false); // Stop loading after the data is processed or an error occurred
          }
          };
          
          useEffect(() => {
            fetchNewBookings();
            }, [currentLanguage,]);
            
            
            
 

  const fetchBookings = async () => {
    setLoading(true); // Start loading before the request
    try {
      // const response = await axios.get(`http://localhost:5000/api/booking?lang=${currentLanguage}`, {
      const response = await axios.get(`https://server.awalivhotel.com/api/booking?lang=${currentLanguage}`, {
      // const response = await axios.get(`https://type-script-server.vercel.app/api/booking?lang=${currentLanguage}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      const transformedData = transformData(response?.data?.data);
      setAllBookingData(transformedData);
    } catch (error) {
      console.log(error);
      // Optionally handle the error, e.g., by setting an error message in state
    } finally {
      setLoading(false); // Stop loading after the data is processed or an error occurred
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentLanguage,]);

  return (
    <>
    <div className="border p-5 shadow-lg mb-10" >
        <div>
            <p className="text-md font-semibold ">Active Bookings</p>
        </div>
        <NewBookingsAdmin allNewBookingData={allNewBookingData} newLoading={newLoading} fetchNewBookings={fetchNewBookings} setAllNewBookingData={setAllNewBookingData} fetchBookings={fetchBookings} />
    </div>
    <div className="border p-5 shadow-lg mb-10">
        <div>
            <p className="text-md font-semibold ">All Bookings</p>
        </div>
        <AllBookingsAdmin allBookingData={allBookingData} loading={loading} fetchBookings={fetchBookings} setAllBookingData={setAllBookingData} />
    </div>
    </>
  )
}

export default AdminBookings