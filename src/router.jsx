import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/Error Page/ErrorPage";
import Home from "./components/pages/Home/Home";
import Check from "./components/pages/Check/Check";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import Search from "./components/pages/SearchRoooms/Search";
import RoomDetails from "./components/pages/RoomDetails/RoomDetails";
import PrivateRoute from "./components/PrivetAuth/PrivetRoute";
import BookNow from "./components/pages/BookNow/BookNow";
// import BookingConfirm from "./components/pages/BookNow/BookingConfirm";
import MyBookings from "./components/pages/My Bookings/MyBookings";
// import SinglePromoRoom from "./components/pages/Promotion/SinglePromoPage/SinglePromoRoom";
import BookTable from "./components/pages/Restaurent/BookTable/BookTable";
import Loginpage from "./components/sharedPages/LoginPage/Loginpage";
import SignUpPage from "./components/sharedPages/SignInPage/SignUpPage";
import BookingConfirm from "./components/pages/BookNow/BookingConfirm";
import Index from "./components/admin/dashboard/Index";
// import Users from "./components/admin/dashboard/component/pages/users";
import AllGuest from "./components/admin/dashboard/component/pages/allGuests/AllGuest";
import Users from "./components/admin/dashboard/component/pages/allGuests/Users";
import AddRoom from "./components/admin/dashboard/component/pages/Rooms/AddRooms/AddRoom";
import ThankYou from "./components/pages/ThankYouPage/ThankYou";
import Promotions from "./components/pages/Promotion/Promotions";
import RoomRate from "./components/pages/Room Rate/RoomRate";
import Banquet from "./components/pages/Banquet & meetings/Banquet";
import Cafe from "./components/pages/Restaurent/restaurant&cafe/Cafe";
import AddAdmin from "./components/admin/dashboard/component/pages/AddAdmin/AddAdmin";
// import AllRooms from "./components/admin/dashboard/component/pages/Rooms/AllRooms/AdminAllRooms";
import AdminAllRooms from "./components/admin/dashboard/component/pages/Rooms/AllRooms/AdminAllRooms";
import AdminBookings from "./components/admin/dashboard/component/pages/Bookings/AdminBookings";
import Invoice from "./components/admin/dashboard/component/pages/Invoice/Invoice";
import Dashboard from "./components/admin/dashboard/component/pages/Dashboard/Dashboard";
import Test1 from "./components/pages/test1/Test1";
import Test2 from "./components/pages/test2/Test2";
import Fullaccess from "./components/pages/fullaccess/Fullaccess";
import EditRoom from "./components/admin/dashboard/component/pages/Rooms/EditRoom/EditRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/check",
        element: <Check />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/banquet",
        element: <Banquet />,
      },
      {
        path: "/test1",
        element: <Test1 />,
      },
      {
        path: "/test2",
        element: <Test2 />,
      },
      {
        path: "/fullaccess",
        element: <Fullaccess/>,
      },
      {
        path: "/roomRate",
        element: <RoomRate />,
      },
      {
        path: "/roomSearch",
        element: <Search />,
      },
      {
        path: "/room/:id",
        element: <RoomDetails />,
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>

          <BookNow />
          </PrivateRoute> 
          )
      },
      {
        path: "/BookingConfirm",
        element: <BookingConfirm />,
      },
      {
        path: "/thank-you",
        element: <ThankYou />,
      },
      {
        path: "/mybookings",
        element: (
          <PrivateRoute>
            
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/promotions",
        element: <Promotions />,
      },
      // {
      //   path: "/singlePromotionRoom/:id",
      //   element: <SinglePromoRoom />,
      // },
      {
        path: "/cafe",
        element: <Cafe />,
      },
      {
        path: "/bookTable",
        element: <BookTable />,
      },
      {
        path: "/login",
        element: <Loginpage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Index />
      </PrivateRoute>
    ),  
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/createAdmin",
        element: <AddAdmin />,
      },
      {
        path: "/dashboard/allGuest",
        element: <AllGuest />
      },
      {
        path: "/dashboard/room/add-room",
        element: <AddRoom />
      },
      {
        path: "/dashboard/edit/:id",
        element: <EditRoom />
      },
      {
        path: "/dashboard/room/all-rooms",
        element: <AdminAllRooms />
      },
      {
        path: "/dashboard/room/all-bookings",
        element: <AdminBookings />
      },
      {
        path:"/dashboard/booking/invoice/:id",
        element: <Invoice />
      },
    ],
  },
]);

export default router;
