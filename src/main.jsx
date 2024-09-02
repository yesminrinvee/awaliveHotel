import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {  RouterProvider } from "react-router-dom";

// import App from "./App";
// import Home from "./components/pages/Home/Home";
// import RoomDetails from "./components/pages/RoomDetails/RoomDetails";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// import Check from "./components/pages/Check/Check";
import AuthProvider from "./components/sharedPages/Context/AuthProvider";
// import BookNow from "./components/pages/BookNow/BookNow";
// import BookingConfirm from "./components/pages/BookNow/BookingConfirm";
// import Search from "./components/pages/SearchRoooms/Search";

// import Contact from "./components/pages/Contact/Contact";
// import About from "./components/pages/About/About";
// // import BookTable from "./components/pages/Restaurent/BookTable/BookTable";
// import Loginpage from "./components/sharedPages/LoginPage/Loginpage";
// import SignUpPage from "./components/sharedPages/SignInPage/SignUpPage";
// import PrivateRoute from "./components/PrivetAuth/PrivetRoute";
import { Spin } from "antd";
// import MyBookings from "./components/pages/My Bookings/MyBookings";
// import ErrorPage from "./components/Error Page/ErrorPage";
// import Promotions from "./components/pages/Promotion/Promotions";
// import SinglePromoRoom from "./components/pages/Promotion/SinglePromoPage/SinglePromoRoom";
import "react-lazy-load-image-component/src/effects/blur.css";
// import BookTable from "./components/pages/Restaurent/BookTable/BookTable";
import router from "./router";
import { QueryClient, QueryClientProvider } from "react-query";
import 'flatpickr/dist/flatpickr.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from '../public/img/awalive-Blaack.png'
// import ScrollToTop from './components/sharedPages/ScrollToTop';

// import 'flag-icon-css/css/flag-icon.min.css'

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    ns: ["home", "contact", "booking", "loginAndSignUp", "footer", "about", "contact"], // Define your namespaces
    defaultNS: "home",
    backend: {
      loadPath: "/Languages/{{lng}}/{{ns}}.json",
    },
    preload: ["home", "contact", "booking", "loginAndSignUp", "footer", "about", "contact"],
  });

  

const loadingMarkup = (
  <div className=" h-screen flex flex-col items-center justify-center text-center gap-5">
  
    <img src={logo} alt="" className="w-1/4" />
    
  </div>
);


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
    </React.StrictMode>
  </Suspense>
);
