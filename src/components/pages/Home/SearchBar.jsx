/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
// import { addDays } from "date-fns";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Modal } from "antd";
import { UserOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchBar = ({ pageContext }) => {
  const { t } = useTranslation("search");
  const {
    numberOfGuests,
    childAges,
    checkIn,
    checkOut,
    child,
    night,
    setChild,
    setNight,
    setGuests,
    setCheckIn,
    setCategory,
    setCheckOut,
    setCalender,
    calender,
    setChildAges,

    // setSearchLoader,
  } = useContext(AuthContext);
  const [modal2Open, setModal2Open] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleIncrement = () => {
    setGuests((prevGuests) => (prevGuests === null ? 1 : prevGuests + 1));
  };

  const handleDecrement = () => {
    setGuests((prevGuests) => (prevGuests > 1 ? prevGuests - 1 : prevGuests));
  };

  const handleCancelModal = () => {
    // Reset the guests state to its default value (1 in this case)
    setGuests(null);
    setChild(0);
    setChildAges([]);

    // Close the modal
    setModal2Open(false);
  };

  const handleSearchReset = () => {
    // Reset the guests state to its default value (1 in this case)
    setCheckIn("check-In");
    setCheckOut("Check-Out");
    setCategory("");
    setGuests(2);
    setChild(0);
    setChildAges([]);
    setNight(0);

    // Close the modal
    setModal2Open(false);
  };

  const handleSelectDate = () => {
    setShowDatePicker(true);
  };

  const handleChildIncrement = () => {
    setChild((prevChild) => prevChild + 1);
    setChildAges((prevAges) => [...prevAges, 1]); // Add a default age of 1 for the new child
  };

  const handleChildDecrement = () => {
    if (child > 0) {
      setChild((prevChild) => prevChild - 1);
      setChildAges((prevAges) => prevAges.slice(0, -1)); // Remove the last child age
    }
  };

  const handleChildAgeChange = (index, age) => {
    const newChildAges = [...childAges];
    newChildAges[index] = age;
    setChildAges(newChildAges);
  };

  const datePickerRef = useRef(); // Create a ref for the date picker

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="container mx-auto relative  py-4 px-4 bg-white  ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center  ">
          <div
            className="flex justify-between items-center px-5 border border-black rounded-md md:py-2 bg-white cursor-pointer "
            onClick={() => setModal2Open(true)}
          >
            <div>
              <div className="flex items-center gap-4">
                <UserOutlined className="text-2xl" />
                <div>
                  <p className="text-xs">{t("guest")}</p>
                  <p className="text-sm">
                    <span>
                      {numberOfGuests}-{t("guest")},
                    </span>
                    <span> 1-{t("room")}</span>
                    {child ? <span> {child}-children</span> : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col relative    px-2 border border-black rounded-md py-1 md:py-2 bg-white cursor-pointer "
            onClick={handleSelectDate}
            ref={datePickerRef}
          >
            <div>
              <p className="tracking-widest text-xs  ">
                {night} -{t("night")}{" "}
              </p>
              <button className="text-sm ">{`${checkIn} - ${checkOut}`}</button>
            </div>
            {showDatePicker && (
              <div className="absolute -left-2  bg-white md:p-10 z-10">
                <DateRange
                  editableDateInputs={true}
                  // onChange={handleDateChange}
                  onChange={(item) => setCalender([item.selection])}
                  minDate={new Date()}
                  color="[#BE9874]"
                  moveRangeOnFirstSelection={false}
                  ranges={calender}
                />
              </div>
            )}
          </div>

          {pageContext === "home" ? (
            <Link
              to={"/roomSearch"}
              // className="bg-[#1C1C1D]  px-5 rounded-md py-2 md:py-4 cursor-pointer text-white text-center uppercase tracking-widest "
              className="uppercase py-3 px-5  text-white rounded-md  md:py-5 cursor-pointer text-center hover:text-[#2E2E2E] text-sm md:text-md transition duration-300    tracking-widest hover:bg-[#BE9874] bg-[#2E2E2E] "
              style={{ fontFamily: "Gilda Display, serif" }}
            >
              {t("availability")}
            </Link>
          ) : (
            <p
              onClick={handleSearchReset}
              className="bg-[#1C1C1D]  px-5 rounded-md py-2 md:py-4 cursor-pointer text-white text-center uppercase "
            >
              {t("reset")}
            </p>
          )}
        </div>
      </div>

      <Modal
        title={t("guest")}
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)} 
        onCancel={handleCancelModal}
        okText="Apply"
        cancelText="Reset"
      >
        <div>
          <div className="flex justify-between py-4">
            <p className="text-sm md:text-xl">{t("adult")}</p>
            <div className="flex gap-2 md:gap-5 items-center">
              <p>
                <MinusCircleOutlined className="text-xl md:text-2xl font-light" onClick={handleDecrement} />
              </p>
              <p className="text-xl md:text-2xl  px-3">{numberOfGuests}</p>
              <p>
                <PlusCircleOutlined className="text-xl md:text-2xl" onClick={handleIncrement} />
              </p>
            </div>
          </div>
          <div className="flex justify-between py-4">
            <p className="text-sm md:text-xl">{t("children")}</p>
            <div className="flex gap-2 md:gap-5 items-center">
              <p>
                <MinusCircleOutlined className="text-xl md:text-2xl font-light" onClick={handleChildDecrement} />
              </p>
              <p className="text-xl md:text-2xl  px-3">{child}</p>
              <p>
                <PlusCircleOutlined className="text-xl md:text-2xl" onClick={handleChildIncrement} />
              </p>
            </div>
          </div>
          {/* Render child age selectors based on the number of children */}
          {childAges.map((age, index) => (
            <div key={index} className="flex justify-between py-2">
              <p className="text-sm md:text-md ">
                {t("child")} {index + 1} {t("age")}
              </p>
              <div className="flex gap-2 md:gap-5 items-center">
                {/* Use a Select component or any other input for age selection */}
                <select value={age} onChange={(e) => handleChildAgeChange(index, parseInt(e.target.value))} className="px-10">
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num} className="">
                      {t("age")} - {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default SearchBar;
