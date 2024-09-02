import { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateRange } from "react-date-range";
// import { addDays } from "date-fns";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
import { Link } from "react-router-dom";
// import { addDays } from 'date-fns';

import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const RoomDate = ({ singleRoomDetails }) => {
  const currentLanguage = i18next.language
  const { t } = useTranslation("search");
  const authInfo = useContext(AuthContext);
  const {
    setRoomId,
    night,
    setNight,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    setCalender,
    calender,
    setGuests,
    numberOfGuests,
    handleBookNow,
    setRoomImage,
    setRoomPrice,
    setRoomName,
  } = authInfo;
  const { roomName, roomPrice, images, id, priceOptions } = singleRoomDetails;
  
  
  const [startDate, setStartDate] = useState(checkIn || new Date());
  const [endDate, setEndDate] = useState(checkOut || addDays(new Date(), 1));
  const [guest, setGuest] = useState(numberOfGuests || 1);

  

  const startDatePickerRef = useRef();
  const endDatePickerRef = useRef();

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // Check if the end date is before the new start date
    const updatedEndDate = addDays(date, 1);
    if (endDate < updatedEndDate) {
      setEndDate(updatedEndDate);
    }
  };

  useEffect(()=>{
    setRoomId(id)
    setGuests(guest)
    setCheckIn(startDate)
    setCheckOut(endDate)
    
  },[endDate, guest, setCheckIn, setCheckOut, setGuests, startDate, setRoomId, id])

  const nights = differenceInCalendarDays(endDate, startDate);

  return (
    <>
      
      
      <div className={` w-full ${currentLanguage === 'ar' ? 'body-ar font-medium ' : 'body-en-title'} `}>
        <div
          className={`flex flex-col gap-5  items-center justify-center text-center bg-[#1C1C1C]  py-5 px-5  md:px-10 relative  ${
            currentLanguage === "ar" ? "body-ar" : "body-en"
          } `}
        >
          <p
            className={`text-white text-xl tracking-widest  bg-[#151515]  w-full py-4 ${
              currentLanguage === "ar" ? "body-ar" : "body-en"
            } `}
          >
            {t("selectDates")}
          </p>
          <div className="grid grid-cols-2 gap-5  w-full">
            <div className="bg-[#151515] flex items-center justify-center py-6">
              <div
                onClick={() => startDatePickerRef.current.setOpen(true)}
                className="text-black flex flex-col gap-2 items-center justify-center focus:outline-none cursor-pointer"
              >
                <p className="tracking-widest text-sm uppercase text-white">{t("CHECK IN")}</p>
                <div className="flex gap-2  items-center" style={{ fontFamily: "Gilda Display, serif" }}>
                  <p className="text-5xl text-[#BE9874]">{format(startDate, "dd")}</p>

                  <div className="flex flex-col items-center">
                    <p className="text-[#BE9874]">{format(startDate, "MMM")}</p>
                    <SlArrowDown className=" text-xs text-[#BE9874]" />
                  </div>
                </div>
              </div>
              {/* Hidden DatePicker for start date */}
              <DatePicker
                ref={startDatePickerRef}
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                dateFormat="dd MMM"
                className="hidden"
              />
            </div>
            <div className="bg-[#151515] flex items-center justify-center py-6">
              <div
                onClick={() => endDatePickerRef.current.setOpen(true)}
                className="text-black flex flex-col gap-2 items-center justify-center focus:outline-none cursor-pointer"
              >
                <p className="tracking-widest text-sm uppercase text-white">{t("CHECK OUT")}</p>
                <div className="flex gap-2  items-center" style={{ fontFamily: "Gilda Display, serif" }}>
                  <p className="text-5xl text-[#BE9874]">{format(endDate, "dd")}</p>

                  <div className="flex flex-col items-center">
                    <p className="text-[#BE9874]">{format(endDate, "MMM")}</p>
                    <SlArrowDown className=" text-xs text-[#BE9874]" />
                  </div>
                </div>
              </div>
              {/* Hidden DatePicker for end date */}
              <DatePicker
                ref={endDatePickerRef}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={addDays(startDate, 1)}
                dateFormat="dd MMM"
                className="hidden"
                popperPlacement="bottom-end"
              />
            </div>

            <div className={`bg-[#151515] flex items-center justify-center py-4  `}>
              <div className="text-black flex flex-col gap-2 items-center justify-center ">
                <p className="tracking-widest text-sm text-white">{t("GUESTS")}</p>
                <div className="flex gap-3  items-center">
                  <p className="text-5xl text-[#BE9874]" style={{ fontFamily: "Gilda Display, serif" }}>
                    {guest}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setGuest(guest + 1)} className="text-xl">
                      <SlArrowUp className="text-gray-400 text-sm" />
                    </button>
                    <button onClick={() => setGuest(Math.max(1, guest - 1))} className="text-xl">
                      <SlArrowDown className="text-gray-400 text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-black flex flex-col gap-2 items-center justify-center bg-[#151515] ">
              <p className="tracking-widest text-sm text-white uppercase">{t("night")}</p>
              <div className="flex gap-3  items-center">
                <p className="text-5xl text-[#BE9874]" style={{ fontFamily: "Gilda Display, serif" }}>
                  {nights}
                </p>
              </div>
            </div>
              
            
          </div>
          <Link
            to={nights > 0 ? "/booking" : "#"}
            onClick={ handleBookNow }
            className={`bg-[#BE9874] w-full py-2 text-white text-sm bookNow `}
          >
            {t("bookNow")}
          </Link>
          {/* <Link>{t("bookNow")} </Link> */}

          <div id="error-message" className="text-red-500 text-xs"></div>
            <div id="perfect-message" className="text-green-500 text-xs"></div>
        </div>
      </div>
    </>
  );
};

export default RoomDate;
