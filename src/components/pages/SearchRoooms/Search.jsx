import { useContext, useEffect, useState } from "react";
import PageAnimation from "../../PageAnimation/PageAnimation";
import BannerPage from "../../sharedPages/PageBanner/BannerPage";
import DatesSearch from "./DatesSearch";
// import axios from "axios";
import AllRooms from "./AllRooms";
import { FaChevronDown } from "react-icons/fa6";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
// import SearchBar from "../Home/SearchBar";
import { SlGrid, SlList } from "react-icons/sl";

import axios from "axios";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Search = () => {

  const {

    setSortByPrice,
    setCheckIn,
    setCheckOut,
    allRooms,
    checkIn,
    checkOut,
    setGuests,
    sortByPrice,
    numberOfGuests,
    loadingAllRooms,
    setLoadingAllRooms,
  } = useContext(AuthContext);
  const { t } = useTranslation("search");
  const currentLanguage = i18next.language;
  // const [categories, setCategories] = useState([]);
  const [roomSize, setRoomSize] = useState(null);
  // const [loadingCategory, setLoadingCategory] = useState(true);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  // const [notFoundRoom, setNotFoundRoom] = useState('');
  
  const formatDateString = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : null;
  };
  const formetDateCheckIn = formatDateString(checkIn);
  const formetDateCheckOut = formatDateString(checkOut);
  

  const handleValue = (value) => {
    setSortByPrice(value);
    setRoomSize(null);
  };

  const handleRoomSizeChange = (value) => {
    setRoomSize(value);
    setSortByPrice(null);

  };

  useEffect(() => {
    setLoadingAvailableRooms(true);
    setErrorMessage('');

    const fetchAllRooms = async () => {
      const params = new URLSearchParams({
        lang: currentLanguage,
        checkInDate: formetDateCheckIn,
        checkOutDate: formetDateCheckOut,
        maxGuests: numberOfGuests
      });
    
      // Add sorting parameters if they exist
      if (roomSize) {
        params.append('sizeOrder', roomSize);
      }
      if (sortByPrice) {
        params.append('sortByPrice', sortByPrice);
      }
      try {
        const response = await axios.get(
          `https://server.awalivhotel.com/api/room/available/?${params.toString()}`
          // `https://type-script-server.vercel.app/api/room/available/?${params.toString()}`
          // `https://type-script-server.vercel.app/api/room/available/?lang=${currentLanguage}&checkInDate=${formetDateCheckIn}&checkOutDate=${formetDateCheckOut}&maxGuests=${numberOfGuests}&sizeOrder=${roomSize}&sortByPrice=${sortByPrice}`
          // `http://localhost:5000/api/room/available/?${params.toString()}`
          // `https://type-script-server.vercel.app/api/room/available/?${params.toString()}`
        );
        let rooms = response.data.data;
        setAvailableRooms(rooms);
        // if (rooms.length === 0) {
        //   setErrorMessage('No rooms available for the selected criteria.');
        // } else {
        //   // Client-side sorting based on the first price option
        //   rooms = rooms.sort((a, b) => {
        //    // If sizes are equal, or if size sorting is not a priority, sort by price
        //    const priceA = a.priceOptions[0]?.price || 0;
        //    const priceB = b.priceOptions[0]?.price || 0;
        //    return sortByPrice === 'asc' ? priceA - priceB : priceB - priceA;
        //   });
        // }
        setAvailableRooms(rooms);
        setLoadingAvailableRooms(false);
      } catch (error) {
        // console.log(error);
        // console.error(error?.response?.data?.error?.statusCode);
        // console.error(error?.response?.data?.issues[0]?.message);
        setErrorMessage(` ${error?.response?.data?.issues[0]?.message}`);
        setAvailableRooms([]); // Clear rooms as there was an error
        setLoadingAvailableRooms(false);
      }
    };
    fetchAllRooms();
}, [setLoadingAvailableRooms, setAvailableRooms, formetDateCheckIn, formetDateCheckOut, sortByPrice, numberOfGuests, currentLanguage, roomSize]);



  

 

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

 

  // if (sortByPrice === "asc") {
  //   availableRooms.sort((a, b) => a.priceOptions[0]?.price - b.priceOptions[0]?.price);
  // } else if (sortByPrice === "highPrice") {
  //   availableRooms.sort((a, b) => b.priceOptions[0]?.price - a.priceOptions[0]?.price);
  // }

  const resetSearch = () => {
    // Reset all state variables associated with the search
    setAvailableRooms([]);
    setLoadingAvailableRooms(false); // Assuming you want to set it to false as there's no loading after reset
    setErrorMessage('');
    // Add any other states you want to reset, for example:
    setCheckIn(new Date());
    setCheckOut(tomorrow);
    // setSortByPrice('default'); // Assuming 'default' is your default sort order
    setGuests(1); // Reset to default value
    // setCurrentLanguage('en'); // Reset to default language
    // setRoomSize('default'); // Assuming 'default' is your default room size filter
  };


  return (
    <>
      <Helmet>
        <title>Room Search - Awalive Hotel | Find Your Perfect Stay in Taif</title>
        <meta
          name="description"
          content="Explore and book your ideal room at Awalive Hotel. Discover our wide range of accommodations to suit all preferences and budgets. Start your unforgettable stay in Taif now!"
        />
        <meta
          name="keywords"
          content="hotel room search, Awalive Hotel rooms, book hotel in Taif, luxury rooms, accommodation in Taif, hotel booking"
        />
        <meta property="og:title" content="Room Search - Awalive Hotel | Find Your Perfect Stay in Taif" />
        <meta
          property="og:description"
          content="Easily find and book your ideal room at Awalive Hotel in Taif. Comfort, luxury, and style await you."
        />
        <meta property="og:image" content="[Link to an image showcasing the hotel or rooms]" />
        <meta property="og:url" content="awalivehotel.com/room-search" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Room Search - Awalive Hotel | Find Your Perfect Stay in Taif" />
        <meta
          name="twitter:description"
          content="Looking for the perfect room in Taif? Explore the various accommodations at Awalive Hotel and book your stay today."
        />
        <meta name="twitter:image" content="[Link to an image showcasing the hotel or rooms]" />
        {/* <!-- Other head elements like canonical link, viewport, language tag --> */}
      </Helmet>
      <PageAnimation>
        <BannerPage text={t("search")} />

        <section className={`bg-[#1a1919]  py-4 px-8 lg::px-0 ${currentLanguage === 'ar' ? 'body-ar font-normal  ' : 'body-en '}  `} >
          {/* <SearchBar
            // setAllRooms={setAllRooms}
            // setNoRoomsMessage={setNoRoomsMessage}
            pageContext="search"
          /> */}
          
          <div className="max-w-7xl mx-auto px-2 md:px-0 grid md:grid-cols-2   py-4    ">
          <div className=" flex gap-4 md:justify-end justify-center">
            <div className="">
              <li className="relative group list-none">
                <div className="flex gap-2 items-center">
                  <p className="text-white uppercase tracking-widest text-sm">{t("sortByPrice")}</p>
                  <FaChevronDown className="font-thin text-xs text-white" />
                </div>

                {/* Dropdown Content */}
                <ul className="absolute w-36 left-0 hidden pt-2  bg-[#1a1919] drop-shadow-md text-md text-white group-hover:block z-10 rounded-sm">
                  <li>
                  <option
                      value={"desc"}
                      className="p-2 mb-2 block hover:bg-slate-50 hover:text-black transition duration-300 ease-in-out  cursor-pointer text-xs uppercase tracking-widest "
                      onClick={() => handleValue("desc")}
                    >
                      {t("highPrice")}
                    </option>
                  </li>
                  <li>
                    
                    <option
                      value={"asc"}
                      className="p-2  block hover:bg-slate-50 hover:text-black transition duration-300 ease-in-out cursor-pointer text-xs uppercase tracking-widest  "
                      onClick={() => handleValue("asc")}
                    >
                      {t("lowPrice")}
                    </option>
                  </li>
                </ul>
              </li>
            </div>

           
            <div className=" ">
              <li className="relative group list-none">
                <div className="flex gap-2 items-center">
                  <p className="text-white uppercase tracking-widest text-sm">{t("ROOM SIZE")}</p>
                  <FaChevronDown className="font-thin text-xs text-white" />
                </div>

                {/* Dropdown Content */}
                <ul className="absolute w-36 left-0 hidden pt-2 bg-[#1a1919] drop-shadow-md text-md text-white group-hover:block z-10 rounded-sm">
                  <li>
                    <option
                      value={"lowToHigh"}
                      className="p-2 mb-2 block hover:bg-slate-50 hover:text-black transition duration-300 ease-in-out cursor-pointer text-xs uppercase tracking-widest"
                      onClick={() => handleRoomSizeChange("lowToHigh")}
                    >
                      {t("SMALLER ROOM")}
                    </option>
                  </li>
                  <li>
                    <option
                      value={"highToLow"}
                      className="p-2 block hover:bg-slate-50 hover:text-black transition duration-300 ease-in-out  cursor-pointer text-xs uppercase tracking-widest "
                      onClick={() => handleRoomSizeChange("highToLow")}
                    >
                      {t("LARGER ROOM")}
                    </option>
                  </li>
                </ul>
              </li>
            </div>
          </div>
          <div className=" hidden md:flex gap-6 justify-end items-center text-gray-300">
            <button onClick={() => setViewMode('list')}>

          <SlList className="text-2xl cursor-pointer" />
            </button>
            <button  onClick={() => setViewMode('grid')}>

          <SlGrid className="text-xl cursor-pointer" />
            </button>
           
          </div>

          </div>
          
        </section>
        <section className="max-w-7xl mx-auto py-16 px-2 md:px-0">
          <div className="flex flex-col md:flex-row gap-5">
            <DatesSearch />
            <AllRooms
            viewMode={viewMode}
              allRooms={allRooms}
              // notFoundRoom={notFoundRoom}
              resetSearch={resetSearch}
              errorMessage={errorMessage}
              availableRooms={availableRooms}
              loadingAvailableRooms={loadingAvailableRooms}
              // noRoomsMessage={noRoomsMessage}
              loadingAllRooms={loadingAllRooms}
              setLoadingAllRooms={setLoadingAllRooms}
            />
          </div>
        </section>
      </PageAnimation>
    </>
  );
};

export default Search;
