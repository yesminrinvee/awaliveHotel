// // import React from 'react'
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import sldierOne from "../../../assets/gym.jpg";
// import sldierTwo from "../../../assets/restuarent.jpg";
// import sldierThree from "../../../assets/swiming.jpg";
// import "./slider.css";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";

// const Slider = () => {
//   const currentLanguage = i18next.language;
//   const { t } = useTranslation("about");

//   return (
//     <div className="">
//       <Swiper
//         key={currentLanguage}
//         dir={currentLanguage === "ar" ? "rtl" : "ltr"}
//         navigation={true}
//         modules={[Navigation, Autoplay]}
//         className={` h-[calc(100vh-30vh)] w-full  overflow-hidden `}
//         autoplay={{ delay: 3000 }}
//         loop={true}
//         style={{ fontFamily: "Gilda Display, serif" }}
//       >
//         <SwiperSlide className="bg-cover bg-center relative">
//           <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//           <img className="w-full h-full  object-cover block" src={sldierOne} alt="" />
//           <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//           <div className="w-[80%] md:w-[50%] mx-auto text-center  absolute  top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 text-white ">
//             <h2 className="text-2xl md:text-6xl ">{t("gymTitle")}</h2>
//             <p className="text-xs py-2 md:py-3 text-gray-400">{t("gymDescription")}</p>
//           </div>
//         </SwiperSlide>
//         <SwiperSlide className="bg-cover bg-center relative">
//           <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//           <img className="w-full h-full  object-cover block" src={sldierTwo} alt="" />
//           {/* <img className='w-full h-full  object-cover block  ' src={person.image} alt="" /> */}
//           <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//           <div className="w-[80%] md:w-[50%] mx-auto  text-center absolute  top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 text-white ">
//             <h2 className="text-2xl md:text-6xl">{t("restaurantTitle")}</h2>
//             <p className="text-xs py-2 md:py-3 text-gray-400">{t("restaurantDescription")}</p>
//           </div>
//         </SwiperSlide>
//         <SwiperSlide className="bg-cover bg-center relative">
//           <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//           <img className="w-full h-full  object-cover block" src={sldierThree} alt="" />
//           <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//           <div className="w-[80%] md:w-[50%] mx-auto text-center absolute  top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 text-white ">
//             <h2 className="text-2xl md:text-6xl">{t("serviceTitle")}</h2>
//             <p className="text-xs py-2 md:py-3">{t("serviceDescription")}</p>
//           </div>
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

// export default Slider;
