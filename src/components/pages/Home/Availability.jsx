// import  {  useState } from "react";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// // import Flatpickr from "react-flatpickr";
// // import "flatpickr/dist/themes/material_green.css";
// // import DatePicker from 'react-datepicker';
// // import "react-datepicker/dist/react-datepicker.css";
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // Main style file
// import 'react-date-range/dist/theme/default.css'; // Theme css file
// import { Link } from "react-router-dom";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";

// const Availability = () => {
//   const currentLanguage = i18next.language;
//     const { t } = useTranslation("search");
//   const [selectionRange, setSelectionRange] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection',
//   });
//   const [guests, setGuests] = useState(1);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleSelect = (ranges) => {
//     setSelectionRange(ranges.selection);
//     if (ranges.selection.endDate &&
//       ranges.selection.startDate.getTime() !== ranges.selection.endDate.getTime()) {
//     setShowDatePicker(false);
//   }
//     console.log(ranges.selection);
//   };

//   // const formatDateDisplay = (date) => {
//   //   return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
//   // };

//    // Function to format and return day and month separately
//    const formatDate = (date) => {
//     const day = date.getDate();
//     const month = date.toLocaleString('default', { month: 'short' });
//     return { day, month };
//   };

//   return (
//     <div dir="ltr" className="w-full h-full md:w-[70%] lg:w-[40%] mx-auto grid grid-cols-1 md:grid-cols-4  " style={{ fontFamily: "Gilda Display, serif" }}>
//       <div className="bg-white flex items-center justify-center py-6">
//         <div  onClick={() => setShowDatePicker(!showDatePicker)} className="text-black flex flex-col gap-2 items-center justify-center  focus:outline-none">
//           <p className={`tracking-widest text-sm ${currentLanguage === 'ar' ? 'body-ar font-medium ' : 'body-en'}`} >{t("CHECK IN")}</p>

//           <div className="flex gap-2  items-center">
//           <p className="text-5xl ">{formatDate(selectionRange.startDate).day}</p>

//             {/* <p >15</p> */}
//             <div className="">
//               <p>{formatDate(selectionRange.startDate).month} ↓</p>
//             </div>
//           </div>

//         </div>
//         {showDatePicker && (
//           <DateRange

//             ranges={[selectionRange]}
//             onChange={handleSelect}
//             className="absolute top-full z-10"
//           />
//         )}
//       </div>

//       <div className="bg-white flex items-center justify-center py-6">
//         <div onClick={() => setShowDatePicker(!showDatePicker)} className="text-black flex flex-col gap-2 items-center justify-center focus:outline-none">
//           <p className={`tracking-widest text-sm uppercase ${currentLanguage === 'ar' ? 'body-ar font-medium ' : 'body-en'}`} >{t("CHECK OUT")}</p>
//           <div className="flex gap-2  items-center">
//             {/* <p className="text-5xl ">15</p> */}
//             <p className="text-5xl ">{formatDate(selectionRange.endDate).day}</p>
//             <div className="">
//               <p>{formatDate(selectionRange.endDate).month} ↓</p>
//               {/* <FaAngleDown className="text-[10px]" /> */}
//             </div>
//           </div>

//         </div>
//       </div>
//       <div className="bg-white flex items-center justify-center py-6 ">
//         <div className="text-black flex flex-col gap-2 items-center justify-center ">
//           <p className= {`tracking-widest text-sm uppercase ${currentLanguage === 'ar' ? 'body-ar font-medium ' : 'body-en'}`} >{t("GUESTS")}</p>
//           <div className="flex gap-3  items-center">
//             <p className="text-5xl ">{guests}</p>
//             <div className=" flex flex-col gap-2">

//               <FaAngleUp onClick={() => setGuests(guests + 1)} className="text-xl "/>
//               <FaAngleDown onClick={() => setGuests(Math.max(1, guests - 1))} className="text-xl " />

//             </div>
//           </div>
//         </div>

//       </div>
//       <Link to={'/roomSearch'} className={`bg-[#1C1C1D] text-white  flex flex-col items-center justify-center cursor-pointer py-6 ${currentLanguage === 'ar' ? 'body-ar  text-xl font-medium ' : 'text-sm body-en'}`} >
//         <p className={`tracking-[0.2rem] uppercase  `}>{t("Check")}</p>
//         <p className="tracking-[0.2rem] uppercase ">{t("Availability")}</p>
//       </Link>
//     </div>
//   );
// };

// export default Availability;

import { useContext, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { addDays, format } from 'date-fns'; // Make sure to import addDays and format
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { AuthContext } from '../../sharedPages/Context/AuthProvider';

const Availability = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation('search');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [guest, setGuest] = useState(1);
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();
  const { night, setNight, setCheckIn, setCheckOut, setGuests, numberOfGuests } = authInfo;

  // Hide the actual DatePicker inputs and trigger them via refs
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

  const handleAvailable = () =>{
    setGuests(guest)
    setCheckIn(startDate)
    setCheckOut(endDate)
     // Navigate programmatically with state
     
  }

  return (
    <div  className="w-full h-full md:w-[70%] lg:w-[40%] mx-auto grid grid-cols-1 md:grid-cols-4" style={{ fontFamily: "Gilda Display, serif" }}>
      
      {/* Check-in date section */}
      <div className="bg-white flex items-center justify-center py-5">
        <div onClick={() => startDatePickerRef.current.setOpen(true)} className="text-black flex flex-col gap-2 items-center justify-center cursor-pointer">
          <p className={`tracking-widest text-sm ${currentLanguage === 'ar' ? 'body-ar font-medium ' : 'body-en'}`}>{t("CHECK IN")}</p>
          <div className="flex gap-2 items-center">
            <p className="text-5xl ">{format(startDate, 'dd')}</p>
            <div className='flex flex-col items-center'>
            <p>{format(startDate, 'MMM')}</p>
            <SlArrowDown className='text-gray-400 text-xs' />

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

      {/* Check-out date section */}
      <div className="bg-white flex items-center justify-center py-5">
        <div onClick={() => endDatePickerRef.current.setOpen(true)} className="text-black flex flex-col gap-2 items-center justify-center cursor-pointer">
          <p className={`tracking-widest text-sm uppercase ${currentLanguage === 'ar' ? 'body-ar font-medium ' : 'body-en'}`}>{t("CHECK OUT")}</p>
          <div className="flex gap-2 items-center">
            <p className="text-5xl ">{format(endDate, 'dd')}</p>
            <div className='flex flex-col items-center'>
            <p>{format(startDate, 'MMM')}</p>
            <SlArrowDown className='text-gray-400 text-xs' />

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
        />
      </div>

      {/* Guests section */}
      <div className="bg-white flex items-center justify-center py-5">
        <div className="text-black flex flex-col gap-2 items-center justify-center">
          <p className={`tracking-widest text-sm uppercase ${currentLanguage === 'ar' ? 'body-ar font-medium ' : 'body-en'}`}>{t("GUESTS")}</p>
          <div className="flex gap-3 items-center">
            <p className="text-5xl ">{guest}</p>
            <div className="flex flex-col gap-2">
              <button onClick={() => setGuest(guest + 1)} className="text-xl"><SlArrowUp className='text-gray-400 text-sm' /></button>
              <button onClick={() => setGuest(Math.max(1, guest - 1))} className="text-xl"><SlArrowDown className='text-gray-400 text-sm' /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Search button */}
      <Link to={ `/roomSearch`} onClick={handleAvailable} className={`bg-[#1C1C1D] text-white flex flex-col items-center justify-center cursor-pointer py-5 ${currentLanguage === 'ar' ? 'body-ar font-medium ' : 'body-en text-sm'}`}>
        <p className="tracking-widest uppercase">{t("Check")}</p>
        <p className="tracking-widest uppercase">{t("Availability")}</p>
      </Link>
    </div>
  );
};

export default Availability;

