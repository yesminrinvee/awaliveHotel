import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { message } from "antd";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { addDays } from "date-fns";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [promotionsData, setPromotionsData] = useState([])
  const [promotionLoading, setPromotionLoading] = useState(true)
  const [promotionError, setPromotionError] = useState(null)
  // const [userRole, setUserRole] = useState(null);
  

  const [allRooms, setAllRooms] = useState([]);
  const [loadingAllRooms, setLoadingAllRooms] = useState(true);

  const [roomId, setRoomId] = useState(0);
  const [RoomName, setRoomName] = useState("");
  const [RoomPrice, setRoomPrice] = useState(0);
  const [RoomImage, setRoomImage] = useState("");
  const [sortByPrice, setSortByPrice] = useState(null);
  const [error, setError] = useState("");

  const [searchLoader, setSearchLoader] = useState(true);
  const [category, setCategory] = useState("");
  const [night, setNight] = useState(0);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(addDays(new Date(), 1));
  const [createdBooking, setCreatedBooking] = useState({})
  const [calender, setCalender] = useState([{ startDate: null, endDate: null, key: "selection" }]);
  // const [guests, setGuests] = useState(1);
  const [numberOfGuests, setGuests] = useState(1);
  const [child, setChild] = useState(0);
  const [childAges, setChildAges] = useState([]);

  const currentLanguage = i18next.language;
  const { t } = useTranslation();

  const handleBookNow = () => {
   

    const bookingInfo = {
      
      roomId: roomId,
      checkIn: checkIn.toLocaleDateString(),
      checkOut: checkOut.toLocaleDateString(),
      numberOfGuests: numberOfGuests,
     
    };
    
    // Save booking information to localStorage
    localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
  };

  // login the user
  const handleLogin = async (email, password) => {
    
    try {
      setLoading(true);
      const response = await axios.post(
        "https://server.awalivhotel.com/api/auth/login",
        // "https://type-script-server.vercel.app/api/auth/login",
        // "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { data } = response.data;
      // setUser(data.user);
      // setUserRole(data.user.role);
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("token", data.accessToken);
      setUser(JSON.parse(localStorage.getItem("userData")))
      // notification["success"]({
      //   message: "Welcome Nice to see you",
      //   placement: "topRight",
      //   duration: 3.5,
      // });
      message.success('Welcome Nice to see you.')
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || "Incorrect email or password");
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error during login");
      }
      // notification["error"]({
      //   message: "Access denied",
      //   description: "PLease check Email and Password is correct",
      //   placement: "topRight",
      //   duration: 3.5,
      // });
      message.error('PLease check Email and Password is correct.')
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { 
    // Clear user data and token from state and localStorage
    // setUser(null);
    setUser("");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    // setUserRole(null);
    setUser(null);  // Assuming you have a setUser method in your context to update the state
  Navigate("/login");
    message.success('You have been logged out successfully.')
    // notification logic here
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() >= exp * 1000) {
        handleLogout();
      } else {
        setUser(JSON.parse(localStorage.getItem("userData")));
      }
    }
  }, []);

  

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
    setLoading(false);
  }, []);

  // fetching all rooms from db
  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get(
          `https://server.awalivhotel.com/api/room/?lang=${currentLanguage}`
          // `https://type-script-server.vercel.app/api/room/?lang=${currentLanguage}`
          // `http://localhost:5000/api/room/?lang=${currentLanguage}`
          // "https://awalive-server-side-hzpa.vercel.app/rooms"
        );
        let rooms = response.data.data;
        
        setAllRooms(rooms);
        // setSearchLoading(false);
        setLoadingAllRooms(false);
      } catch (error) {

        // setSearchLoading(false);
      }
      setLoadingAllRooms(false);
    };
    fetchAllRooms();
    // setSearchLoading(false)
  }, [currentLanguage, t, setLoadingAllRooms]);


  console.log(allRooms, 'alls rooms');
  useEffect(() => {
    
    const fetchPromotionData = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/api/room/promotion?lang=${currentLanguage}`);
        const response = await axios.get(`https://server.awalivhotel.com/api/room/promotion?lang=${currentLanguage}`);
        // const response = await axios.get(`https://type-script-server.vercel.app/api/room/promotion?lang=${currentLanguage}`);

        const firstFourItems = response.data.data
    
        setPromotionsData(firstFourItems)
        setPromotionLoading(false)
      } catch (error) {
        if (error.response) {
          // The request was made, but the server responded with an error status
          
          setPromotionError(error.response.data.issues[0].message            || error.response.data )
          setPromotionLoading(false)
        } else if (error.request) {
          // The request was made, but no response was received
          
          setPromotionLoading(false)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
          setPromotionLoading(false)
        }
        
        // Handle the error as needed
      }
    };
    
    fetchPromotionData(); // Call the async function
    setPromotionLoading(false)
  }, [currentLanguage]); 



  const authInfo = {
    loading,
    setLoading,
    // guests,
    numberOfGuests,
    RoomImage,
    RoomPrice,
    RoomName,
    searchLoader,
    sortByPrice,
    childAges,
    allRooms,
    calender,
    loadingAllRooms,
    checkIn,
    checkOut,
    category,
    // userRole,
    child,
    night,
    setChild,
    setNight,
    setGuests,
    setCheckIn,
    setCalender,
    setCheckOut,
    setAllRooms,
    setChildAges,
    setSortByPrice,
    setLoadingAllRooms,
    setCategory,
    setSearchLoader,
    handleBookNow,
    setCreatedBooking,
    createdBooking,
    promotionError,
    promotionLoading,
    promotionsData,
    // roomId,
    setRoomImage,
    setRoomPrice,
    setRoomName,
    setRoomId,
    // bookingInfo,
    handleLogin,
    handleLogout,
    setError,
    error,
    user,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
