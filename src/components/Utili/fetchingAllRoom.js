// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../sharedPages/Context/AuthProvider";


// const {setAllRooms} = useContext(AuthContext)
// useEffect(() => {
//     const fetchAllRooms = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/room/?lang=${currentLanguage}`
//           // "https://awalive-server-side-hzpa.vercel.app/rooms" 
//         );
//         setAllRooms(response.data.data);
//         // setSearchLoading(false);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching room rates:", error);
//         // setSearchLoading(false);
//       }
//       setLoading(false);
//     };

//     fetchAllRooms();
//     // setSearchLoading(false)
//   }, [currentLanguage,t]);