import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
import BookingDate from "./BookingDate";
import { Tabs,  } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import BannerPage from "../../sharedPages/PageBanner/BannerPage";

// import https from 'https';

const BookingConfirm = () => {
  const currentLanguage = i18next.language;
  // const [loading, setLoading] = useState(true);
  const [bookingInfo, setBookingInfo] = useState({});
  const { user, setCreatedBooking ,loading, setLoading,  setError} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { t } = useTranslation("booking");
 
  useEffect(  () => {
    setLoading(true)
    // Retrieve data from localStorage on component mount
    const storedBookingInfo =  localStorage.getItem('bookingInfo');
    if (storedBookingInfo) {
      const parsedBookingInfo = JSON.parse(storedBookingInfo);
      setBookingInfo(parsedBookingInfo); // Set the booking info into state
    }
    setLoading(false)
  }, [setLoading]);
  

  const handleBookNow = async (paymentType) => {
    
    setLoading(true)
    const token =  localStorage.getItem('token');
    const userId = user ? user.email : bookingInfo.guestData.email;
    // Assuming storedBookingInfo is already parsed from localStorage
    const bookingData = {
      ...bookingInfo,
      paymentType: paymentType, // "Payment on Arrival" or "Booking Request"
      userId: userId,
    };

    
    try {
      const response = await axios.post('https://server.awalivhotel.com/api/booking', bookingData,  {
      // const response = await axios.post('https://type-script-server.vercel.app/api/booking', bookingData,  {
        // httpsAgent: agent,
        headers: {
            Authorization: `${token}` // This will send your token in the Authorization header
        }
    }); // Use the correct endpoint
      setCreatedBooking(response.data.data); // Assuming the server responds with the created booking in 'data' field
      sessionStorage.setItem('bookingId', response.data.data._id);
      setError(''); // Clear any previous errors
      navigate('/thank-you');
      setLoading(false)
      localStorage.removeItem('bookingInfo'); 
    } catch (error) {
      setError(`Booking creation failed. Please try again. ${error.message}`); // Simplified error handling for user feedback
      setCreatedBooking(null); // Clear any previous booking data
      setLoading(false)
  }
    
  };
  

  // eslint-disable-next-line no-unused-vars
  const onChange = (key) => {
    // console.log(key);
  };
  const items = [
    {
      key: "2",
      label: t("paymentOnArrival"),
      children: (
        <div className=" ">
          <p className="py-4 text-gray-400 font-medium">{t("payAtHotelMessage")}</p>
         
            <button className="bg-[#BE9874] py-2 px-8 text-xs text-white font-semibold tracking-widest uppercase " onClick={() => handleBookNow("Payment on Arrival")}>
            {t("bookNow")}
            </button>
          
          {/* {loading ? (
            <Spin />
          ) : (
            <button className="bg-[#BE9874] py-2 px-8 text-sm text-white" onClick={() => handleBookNow("Payment on Arrival")}>
              Book Now
            </button>
          )} */}
        </div>
      ),
    },
    // {
    //   key: "3",
    //   label: t("Booking Request"),
    //   children: (
    //     <div className="text-gray-500 ">
    //       <p className="py-4">{t("Booking Request")}</p>
         
    //         <button className="bg-[#BE9874] py-2 px-8 text-sm text-white" onClick={() => handleBookNow("Payment on Arrival")}>
    //           Send Request
    //         </button>
          
    //       {/* {loading ? (
    //         <Spin />
    //       ) : (
    //         <button className="bg-[#BE9874] py-2 px-8 text-sm text-white" onClick={() => handleBookNow("Payment on Arrival")}>
    //           Book Now
    //         </button>
    //       )} */}
    //     </div>
    //   ),
    // },
  ];

  if(loading){
    <div>Loading</div>
  }

  return (
    <>
    <BannerPage text={t("Check Out")} />
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 py-10 md:py-20">
            <BookingDate />
            {loading ? (
              <div>loading</div>
            ):(
              <div className="md:w-2/3">
              <div>
                <h2
                  className={`text-xl text-black md:text-3xl pb-8  ${currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"}`}
                >
                  {t("yourOrderDetails")} :
                </h2>
                {/* <p className="text-gray-400">{t("emailPhoneError")} </p> */}
                <div className={`${currentLanguage === "ar" ? "body-ar font-medium" : "body-en"}`}>
                  <div className="flex flex-col gap-2 tracking-widest py-2">
                    <div className="grid md:grid-cols-2 gap-1 text-sm ">
                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium"> {t("Name")}: </p>
                        {/* <span className="font-semibold"> {firstName} </span> */}
                        <span className="text-gray-500"> {bookingInfo.guestData.firstName}</span>
                      </div>
                      <div className="flex items-center ">
                        <p className="py-2 px-2 text-black font-medium "> {t("Surname")}:</p>
                        {/* <span className="font-semibold">{lastName}</span> */}
                        <span className="text-gray-500">{bookingInfo.guestData.lastName}</span>
                      </div>

                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium"> {t("Email")}:</p>
                        <span className="text-gray-500">{bookingInfo.guestData.email}</span>
                       
                      </div>
                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium"> {t("Phone")}:</p>
                        <span className="text-gray-500">{bookingInfo.guestData.phone}</span>
                        </div>
                     
                      
                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium"> {t("City")}:</p>
                        {/* <span className="font-semibold">{city}</span> */}
                        <span className="text-gray-500">{bookingInfo.guestData.city}</span>
                      </div>
                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium "> {t("arrival")}:</p>
                        {/* <span className="font-semibold">{arrivalTime}</span> */}
                        <span className="text-gray-500">{bookingInfo.guestData.arrivalTime}</span>
                      </div>
                      
                    </div>
                    <div className="flex items-center text-sm">
                        <p className="py-2 px-2 text-black font-medium"> {t("Address")}:</p>
                        {/* <span className="font-semibold">{address}</span> */}
                        <span className="text-gray-500">{bookingInfo.guestData.address}</span>
                      </div>
                    <div className="flex items-center text-sm">
                        <p className="py-2 px-2 text-black font-medium "> {t("Message")}:</p>
                        {/* <span className="font-semibold">{message}</span> */}
                        <span className="text-gray-500">{bookingInfo.guestData.message}</span>
                      </div>
                      
                    <div className="text-tracking-widest text-xs py-2 px-2 mt-10 ">
                      <p className="font-semibold mb-2 text-black">{t("Tax")} :</p>
                      <p>{t("Included 15 % VAT")}</p>
                    </div>
                  <hr />
                  </div>
                </div>
              </div>
              <div className="py-5">
              <p className={`text-3xl text-black tracking-widest py-3 ${currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"}`}>{t("Payment Options")} :</p>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
              </div>
            </div>
            )
            
          }
          </div>
        </div>
      </section>
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <Modal
          title="Booking Information"
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={[
            <button key="cancel" onClick={handleModalCancel}>
              Close
            </button>,
          ]}
        >
          <p>{order}</p>
         
        </Modal>
      )} */}
      
    </>
  );
};

export default BookingConfirm;
