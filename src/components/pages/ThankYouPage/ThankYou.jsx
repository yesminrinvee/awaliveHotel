import  { useContext, useEffect, useState } from "react";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import BannerPage from "../../sharedPages/PageBanner/BannerPage";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
import ThankYouDate from "./TankYouDate";
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from "antd";

const ThankYou = () => {
  const [thankYouLoading, setThanYouLoading] = useState(true);
  const [bookedRoomDetails, setBookedRoomDetails] = useState({});
  const currentLanguage = i18next.language;
  const { t } = useTranslation("booking");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const bookingId = sessionStorage.getItem("bookingId");
    const fetchRoomDetails = async () => {
      try {
        setThanYouLoading(true); // Start loading
        const response = await axios.get(`https://server.awalivhotel.com/api/booking/room/${bookingId}`);
        // const response = await axios.get(`https://type-script-server.vercel.app/api/booking/room/${bookingId}`);
        // const response = await axios.get(`http://localhost:5000/api/booking/room/${bookingId}`);
        setBookedRoomDetails(response.data.data); // Set your state based on response
      } catch (err) {
        // setError(err.message); // Set error message in state
        message.error(`${err.response.data.issues[0].message        }`)
        console.log(err, "room resposne ");
      } finally {
        setThanYouLoading(false); // Finish loading regardless of the outcome
      }

      //   }
    };

    fetchRoomDetails();
  }, [currentLanguage, setThanYouLoading]);

  if (thankYouLoading) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>; // This should be 'return', not just expression.
  }

  return (
    <>
      <BannerPage text={t("Thank You")} />
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 py-10 md:py-20">
            <ThankYouDate bookedRoomDetails={bookedRoomDetails} thankYouLoading={thankYouLoading} setThanYouLoading={setThanYouLoading} />
            <div className="md:w-2/3">
              <div>
                {!user && (
                  <p
                    className={`text-xs  bg-[#BE9874] mb-8 py-3 font-semibold text-black px-2 tracking-wider ${
                      currentLanguage === "ar" ? "body-ar " : "body-en"
                    }`}
                  >
                    {t("GuestBookedMessage")}
                  </p>
                )}
                <h2
                  className={`text-xl text-black md:text-3xl pb-8  ${
                    currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"
                  }`}
                >
                  {t("yourOrderDetails")} :
                </h2>
                <div className="pb-4">
                  <h2
                    className={`text-xl text-black  pb-3  ${currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"}`}
                  >
                    {t("Booking Number")} :
                  </h2>
                  <p className="text-gray-600 font-semibold">{bookedRoomDetails?.bookingNumber}</p>
                </div>
                {/* <p className="text-gray-400">{t("emailPhoneError")} </p> */}
                <div className={`${currentLanguage === "ar" ? "body-ar font-medium" : "body-en"}`}>
                  <div className="flex flex-col gap-2 tracking-widest py-2">
                    <div className="grid md:grid-cols-2 gap-1 text-sm ">
                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium"> {t("Name")}: </p>
                        {/* <span className="font-semibold"> {firstName} </span> */}
                        <span className="text-gray-500"> {bookedRoomDetails?.guestData?.firstName}</span>
                      </div>
                      <div className="flex items-center ">
                        <p className="py-2 px-2 text-black font-medium "> {t("Surname")}:</p>
                        {/* <span className="font-semibold">{lastName}</span> */}
                        <span className="text-gray-500">{bookedRoomDetails?.guestData?.lastName}</span>
                      </div>

                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium"> {t("Email")}:</p>
                        <span className="text-gray-500">{bookedRoomDetails?.guestData?.email}</span>
                      </div>
                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium"> {t("Phone")}:</p>
                        <span className="text-gray-500">{bookedRoomDetails?.guestData?.phone}</span>
                      </div>

                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium"> {t("City")}:</p>
                        {/* <span className="font-semibold">{city}</span> */}
                        <span className="text-gray-500">{bookedRoomDetails.guestData?.city}</span>
                      </div>
                      <div className="flex items-center">
                        <p className="py-2 px-2 text-black font-medium "> {t("arrival")}:</p>
                        {/* <span className="font-semibold">{arrivalTime}</span> */}
                        <span className="text-gray-500">{bookedRoomDetails.guestData?.arrivalTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <p className="py-2 px-2 text-black font-medium"> {t("Address")}:</p>
                      {/* <span className="font-semibold">{address}</span> */}
                      <span className="text-gray-500">{bookedRoomDetails.guestData?.address}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <p className="py-2 px-2 text-black font-medium "> {t("Message")}:</p>
                      {/* <span className="font-semibold">{message}</span> */}
                      <span className="text-gray-500">{bookedRoomDetails.guestData?.message}</span>
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
                <p
                  className={`text-3xl text-black tracking-widest py-3 ${
                    currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"
                  }`}
                >
                  {t("Payment Options")} :
                </p>
                <p className="py-4 text-slate-700">{bookedRoomDetails.paymentType}</p>
                {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
                <Link to={`/roomSearch`} className="py-2 px-6 bg-black text-white uppercase tracking-widest text-sm">
                  {t("Retune to Search Room")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYou;
