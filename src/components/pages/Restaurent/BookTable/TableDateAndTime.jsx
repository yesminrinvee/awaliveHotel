import  { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import img from "../../../../assets/restaurant.jpg";
// import { Select, Space } from "antd";
import "./TableBooking.css";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import axios from "axios";

const TableDateAndTime = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("restaurant");
  

  const [page, setPage] = useState(1);
  const [selectedTime, setSelectedTime] = useState("9:00 am");
  const [person, setPerson] = useState(1); // Number of guests
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRestaurant, setSelectedRestaurant] = useState(t("Roof Top"));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [bookingSuccessOrErr, setBookingSuccessOrErr] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [loading, setLoading] = useState(false);
  

  // Error state for form validation

  

  const timeSlots = [
    "9:00 am",
    "9:30 am",
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 pm",
    "12:30 pm",
    "1:00 pm",
    "1:30 pm",
    "2:00 pm",
    "2:30 pm",
    "3:00 pm",
    "3:30 pm",
    "4:00 pm",
    "4:30 pm",
    "5:00 pm",
    "5:30 pm",
    "6:00 pm",
  ];

  // const handleTimeSlotSelect = (time) => {
  //   setSelectedTime(time);
  // };

  const handleSelect = (date) => {
    setSelectedDate(date);
  };

  const handleRestaurant = (event) => {
    event.preventDefault();
    setSelectedRestaurant(event.target.value);
  };

  
  const handleIncrement = () => setPerson(person + 1);
  const handleDecrement = () => setPerson(Math.max(1, person - 1)); // Prevent less than 1
  const handleTimeSlotSelect = (time) => setSelectedTime(time);


  // Handling input changes
const handleChange = (e) => {
  const { name, value } = e.target;
  if (errors[name]) {
    setErrors({ ...errors, [name]: '' }); // Clear specific error when user starts typing
  }
  // Update state based on input name
  switch(name) {
    case 'name':
      setName(value);
      break;
    case 'phone':
      setPhone(value);
      break;
    case 'email':
      setEmail(value);
      break;
    case 'message':
      setMessage(value);
      break;
    default:
      break;
  }
};

// Validate page 2 form inputs
const validateForm = () => {
  const newErrors = {};
  if (!name.trim()) newErrors.name = 'Name is required';
  if (!phone.trim()) newErrors.phone = 'Phone is required';
  if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';
  // Add more validation as needed

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // Returns true if no errors
};

// Function to handle next page transition
const handleNextPage = async () => {
  if (page === 1) {
    setPage(2); // No validation needed for page 1, move to page 2 directly
  } else if (page === 2) {
    const isValid = validateForm(); // Validate form inputs for page 2
    if (isValid) {
      // Prepare the data to be sent
      const bookingData = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        bookingDate: new Date(selectedDate),
        time: selectedTime,
        guest: person,
        restaurantName:selectedRestaurant
      };
      
      setLoading(true); // Start loading
      try {
        const response = await axios.post('https://server.awalivhotel.com/api/Table-booking/create', bookingData);
        // const response = await axios.post('https://type-script-server.vercel.app/api/Table-booking/create', bookingData);

        // setBookingSuccess(true);
        setBookingMessage('Booking confirmed!');
        setPage(3);
      } catch (error) {
        console.log(error,'errrrrrr');
        // setBookingSuccess(false);
        if (error.response && error.response.data.issues ) {
          // If the server sends back a list of errors, display them
          setBookingSuccessOrErr(error.response.data?.message);
          console.log(error.response.data.issues.map(issue => `${issue.path}: ${issue.message}`));
          setBookingMessage(Object.values(error.response.data.issues.map(issue => `${issue.path}: ${issue.message}`) ));
        } else {
          // Use a general error message if the server response doesn't include error details
          setBookingMessage('An error occurred');
        }
        setPage(3);
      } finally {
        setLoading(false); // End loading
      }
    }
  }
  // No actions needed for page 3 within this function
};


  return (
    <>
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col  items-center justify-center pb-20 ">
          {page === 1 && (
            <>
              <div>
                {/* steps  */}
                <div className={`max-w-7xl mx-auto flex items-center justify-center py-16 `}>
                  <div
                    className={`flex flex-wrap items-center justify-center w-80 md:w-[36rem] lg:w-[40rem] gap-5 md:gap-16  text-black ${
                      currentLanguage === "ar" ? "body-ar font-semibold  " : "body-en "
                    }`}
                  >
                    <div className="flex gap-3 items-center col-span-1">
                      <p className="bg-[#BE9874] text-white  h-7 w-7 flex items-center justify-center text-sm  rounded-full ">
                        1
                      </p>
                      <p className="uppercase tracking-[0.2rem] text-sm ">{t("SEARCH")}</p>
                    </div>
                    <div className="flex flex-row gap-3 justify-center items-center ">
                      <p className=" bg-[#1C1C1D] text-white border border-gray-100-50 h-7 w-7 flex items-center justify-center  text-sm  rounded-full ">
                        2
                      </p>
                      <p className="uppercase tracking-[0.2rem] text-sm ">{t("DETAILS")}</p>
                    </div>
                    <div className="flex flex-row gap-3 justify-center items-center ">
                      <p className=" bg-[#1C1C1D] text-white border border-gray-100-50 h-7 w-7 flex items-center justify-center  text-sm  rounded-full ">
                        3
                      </p>
                      <p className="uppercase tracking-[0.2rem] text-sm ">{t("CONFIRM")}</p>
                    </div>
                  </div>
                </div>

                <div dir="ltr" className="flex flex-col md:flex-row gap-5 items-stretch ">
                  <div className="relative md:w-1/2 flex flex-col justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-black  to-transparent opacity-100"></div>
                    <img src={img} alt=" " className=" min-h-[300px] md:h-full w-full object-cover" />
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-center justify-center text-white ">
                      <div className="relative h-16   min-w-[200px]">
                        <select
                          value={selectedRestaurant} // Bind state to select
                          onChange={handleRestaurant} // Attach event handler
                          className="peer h-full w-full uppercase tracking-widest text-xl  bg-black  border-t-transparent bg-transparent px-3 py-2.5 font-sans font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900  focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        >
                          <option className="bg-black py-4 uppercase text-sm" value="Roof Top">
                            {t("Roof Top")}
                          </option>
                          <option className="bg-black py-4 uppercase text-sm" value=" Hotel Restaurant">
                            {t("Hotel Restaurant")}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div
                      className={`absolute  bottom-0 left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center justify-center gap-3 text-white ${
                        currentLanguage === "ar" ? "body-ar font-semibold  " : "body-en-title "
                      }`}
                    >
                      <p className="uppercase tracking-widest text-xl">{t("Guest")}</p>
                      <div className="flex justify-center items-center gap-4 ">
                        <p className="text-5xl min-w-[30px]">{person}</p>
                        <div className="flex flex-col gap-3 text-xl">
                          <button className="text-white " onClick={handleIncrement}>
                            <FaAngleUp />
                          </button>
                          <button className="text-white" onClick={handleDecrement}>
                            <FaAngleDown />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 min-h-[300px]  flex">
                    <Calendar
                      className="w-full   flex-1" // Ensure the Calendar takes full width and expands to fill the flex container
                      onChange={handleSelect}
                      date={selectedDate}
                      minDate={new Date()}
                      showSelectionPreview
                    />
                  </div>
                </div>
              </div>
              <div className=" max-w-5xl flex flex-col items-center pt-16 gap-4">
                <div className="mb-4 text-2xl">{t("TIME")}:</div>
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSlotSelect(time)}
                      className={`py-2 px-4 text-white text-sm tracking-widest  ${
                        selectedTime === time ? "bg-[#1C1C1D] " : "bg-[#BE9874]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button
                  className={`py-3 px-6 text-xs font-semibold tracking-[0.2rem] uppercase text-white ${
                    selectedTime ? "bg-[#BE9874] hover:bg-[#dda875]" : "bg-gray-300"
                  } cursor-pointer`}
                  onClick={handleNextPage}
                  disabled={!selectedTime}
                >
                  {t("Book A Table")}
                </button>
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <div className="max-w-7xl mx-auto flex items-center justify-center py-16">
                <div
                  className={`grid grid-cols-2 md:grid-cols-3 w-80 md:w-[36rem] lg:w-[40rem] gap-5 lg:gap-6  text-black ${
                    currentLanguage === "ar" ? "body-ar font-normal  " : "body-en "
                  }`}
                >
                  <div className="flex gap-3 items-center col-span-1">
                    <p className=" bg-[#1C1C1D] text-white  h-7 w-7 flex items-center justify-center text-sm  rounded-full ">1</p>
                    <p className="uppercase tracking-[0.2rem] text-sm ">{t("SEARCH")}</p>
                  </div>
                  <div className="flex flex-row gap-3 justify-center items-center ">
                    <p className=" bg-[#BE9874] text-white border border-gray-100-50 h-7 w-7 flex items-center justify-center  text-sm  rounded-full ">
                      2
                    </p>
                    <p className="uppercase tracking-[0.2rem] text-sm ">{t("DETAILS")}</p>
                  </div>
                  <div className="flex flex-row gap-3 justify-center items-center ">
                    <p className=" bg-[#1C1C1D] text-white border border-gray-100-50 h-7 w-7 flex items-center justify-center  text-sm  rounded-full ">
                      3
                    </p>
                    <p className="uppercase tracking-[0.2rem] text-sm ">{t("CONFIRM")}</p>
                  </div>
                </div>
              </div>
              <div dir="" className="flex flex-col gap-5 md:gap-10 items-center justify-center ">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className=" md:w-1/2 relative ">
                    <div className="absolute inset-0 bg-gradient-to-b from-black  to-transparent "></div>
                    <img src={img} alt=" " className="h-2/3 w-full object-cover" />
                    <div className="absolute top-15 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-center justify-center text-white ">
                      <p className=" h-full w-full text-xl    ">{selectedRestaurant}</p>
                      {/* </div> */}
                    </div>
                    <ul className="h-1/3 text-white bg-[#1C1C1D] w-full flex flex-row px-2 md:px-10 items-center justify-between py-3 text-xs md:text-sm tracking-widest">
                      <li>
                        <span className="text-sm"> {t("Guest")}:</span> <span className="">{person}</span>
                      </li>
                      <li className="capitalize">
                        {t("Date")}: <span>{selectedDate.toDateString()}</span>
                      </li>
                      <li className="capitalize">
                        {t("TIME")}: <span>{selectedTime}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-[50%] flex flex-col  md:justify-center  px-5 border pb-10 text-black">
                    <p className="text-center py-10 text-xl">{t("Booking confirmation :")} :</p>
                    <div className="w-full flex flex-col gap-5 " id="guest-info-form">
                      <div className="flex flex-col">
                        <label className="tracking-widest capitalize" htmlFor="name">
                          {t("Name")}*
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          // onChange={(e) => setName(e.target.value)}
                          onChange={handleChange}
                          className={`py-2 px-2  border bg-slate-50 ${errors.name && "border-red-500 "}`}
                          required
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="capitalize" htmlFor="email">
                          {t("Email")}*
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                          onChange={handleChange}
                          className={`py-2 px-2 border bg-slate-50 ${errors.email && "border-red-500"}`}
                          required
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      </div>
                      <div className="flex flex-col">
                        <label className="capitalize" htmlFor="phone">
                          {t("Phone")}*
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={phone}
                          // onChange={(e) => setPhone(e.target.value)}
                          onChange={handleChange}
                          className={`py-2 px-2 border bg-slate-50 ${errors.phone && "border-red-500"}`}
                          required
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                      </div>
                      <div className="flex flex-col">
                        <label className="capitalize" htmlFor="message">
                          {t("Message")}
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          cols="30"
                          rows="5"
                          value={message}
                          // onChange={(e) => setMessage(e.target.value)}
                          onChange={handleChange}
                          className="py-2 px-2 border bg-slate-50"
                        ></textarea>
                      </div>
                      <div className="pt-4">
                        <button
                          type="button"
                          id="confirm-button"
                          className="uppercase w-full bg-[#BE9874] text-xs tracking-[0.2rem] font-semibold text-white py-3"
                          // onClick={handleBookTable}
                          onClick={handleNextPage}
                        >
                          {t("Checkout")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {page === 3 && (
            <>
              <div className="max-w-7xl mx-auto flex items-center justify-center py-16">
                <div
                  className={`grid grid-cols-2 md:grid-cols-3  w-80 md:w-[36rem] lg:w-[40rem] gap-5 lg:gap-6  text-black ${
                    currentLanguage === "ar" ? "body-ar font-normal  " : "body-en "
                  }`}
                >
                  <div className="flex gap-3 items-center col-span-1">
                    <p className=" bg-[#1C1C1D] text-white  h-7 w-7 flex items-center justify-center text-sm  rounded-full ">1</p>
                    <p className="uppercase tracking-[0.2rem] text-sm ">{t("SEARCH")}</p>
                  </div>
                  <div className="flex flex-row gap-3 justify-center items-center ">
                    <p className=" bg-[#1C1C1D] text-white  border border-gray-100-50 h-7 w-7 flex items-center justify-center  text-sm  rounded-full ">
                      2
                    </p>
                    <p className="uppercase tracking-[0.2rem] text-sm ">{t("DETAILS")}</p>
                  </div>
                  <div className="flex flex-row gap-3 justify-center items-center ">
                    <p className="  bg-[#BE9874] text-white border border-gray-100-50 h-7 w-7 flex items-center justify-center  text-sm  rounded-full ">
                      3
                    </p>
                    <p className="uppercase tracking-[0.2rem] text-sm ">{t("CONFIRM")}</p>
                  </div>
                </div>
              </div>
              <div dir="" className="flex flex-col gap-5 md:gap-10 items-center justify-center ">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className=" md:w-1/2 relative ">
                    <div className="absolute inset-0 bg-gradient-to-b from-black  to-transparent "></div>
                    <img src={img} alt=" " className="h-2/3 w-full object-cover" />
                    <div className="absolute top-15 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-center justify-center text-white ">
                      <p className=" h-full w-full text-xl    ">{selectedRestaurant}</p>
                      {/* </div> */}
                    </div>
                    <ul className="h-1/3 text-white flex flex-col justify-center items-center gap-5 bg-[#1C1C1D]  py-3 text-xs md:text-sm tracking-widest">
                      <div className="w-full flex flex-row px-2 md:px-10 items-center justify-between">
                        <li>
                          <span className="text-sm"> {t("Guest")}:</span> <span className="">{person}</span>
                        </li>
                        <li className="capitalize">
                          {t("Date")}: <span>{selectedDate.toDateString()}</span>
                        </li>
                        <li className="capitalize">
                          {t("TIME")}: <span>{selectedTime}</span>
                        </li>
                      </div>
                      <div className="px-3  ">
                        <div className="flex flex-row flex-wrap gap-3 justify-center items-center text-xs">
                          <div className="flex  items-center">
                            <p>{t("Name")} :</p>
                            <p>{name}</p>
                          </div>
                          <div className="flex  items-center">
                            <p>{t("Email")} :</p>
                            <p>{email}</p>
                          </div>
                          <div className="flex items-center ">
                            <p>{t("Phone")} :</p>
                            <p>{phone}</p>
                          </div>
                          <div className="flex items-center overflow-hidden max-w-[260px] ">
                            <p>{t("Message")} :</p>
                            <p className="">{message}</p>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                  {loading? (
                    <div>Loading</div>
                  ): (
                    <div className="md:w-[50%] flex flex-col  md:justify-center  px-5 border pb-10 text-black">
                    {/* <p className="text-center py-10 text-xl">{t("tableBookSuccessMessage")}</p> */}
                    <p className="text-center py-10 text-xl">{bookingSuccessOrErr}</p>
                    <p className="text-center py-10 text-xl">{bookingMessage}</p>
                    <div className="w-full flex flex-col gap-5 text-center " id="guest-info-form">
                      {!bookingSuccessOrErr && <p>{t("tableBookSuccessMessage")}</p> }
                      <div className="pt-4">
                        <button
                          type="button"
                          id="confirm-button"
                          className="uppercase w-full bg-[#BE9874] text-xs tracking-[0.2rem] font-semibold text-white py-3"
                        
                        >
                          {t("Back to Home")}
                        </button>
                      </div>
                    </div>
                  </div>
                  )  }
                  
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default TableDateAndTime;
