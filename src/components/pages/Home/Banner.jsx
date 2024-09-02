// import bannerImagTwo from "../../../assets/5.jpg";
// import bannerImagOne from "../../../assets/restuarent.jpg";
// import "./home.css";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "../About/slider.css";
// import { Link } from "react-router-dom";
// import i18next from "i18next";
// import SearchBar from "./SearchBar";
// import { useTranslation } from "react-i18next";
// import {motion } from 'framer-motion';
// import Availability from "./Availability";

// const Banner = () => {
//   const currentLanguage = i18next.language;
//   const { t } = useTranslation("home");

//   const intro = {
//     hidden: { opacity: 0},
//     visible:{
//       opacity: 1,
//         transition :{
//           staggerChildren: .6,
//           duration: 1,
//           delay: 1
//           },
//     }
//   }

//   const childVariants = {
//     hidden: { opacity: 0, y: -100 },
//     visible: { 
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5, 
//       },
//     },
//   };


//   return (
//     <>
//       <div className="md:relative">
//         <div data-aos="zoom-in">
//           <Swiper
//             navigation={true}
//             modules={[Navigation, Autoplay]}
//             className={` h-[calc(100vh-120px)] `}
//             // className={` h-screen `}
//             autoplay={{ delay: 4000 }}
//             loop={true}
//             dir={!currentLanguage ? "rtl" : "ltr"}
//             key={currentLanguage}
//           >
//             {/* <SwiperSlide className="bg-cover bg-center relative cursor-pointer" style={{ fontFamily: "Gilda Display, serif" }}> */}
//             <SwiperSlide className={`bg-cover bg-center relative cursor-pointer ${currentLanguage === 'ar' ? 'body-ar text-xl font-medium ' : 'body-en-title'}`} >
//               {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div> */}
//               <img className="w-full h-full  object-cover block  " src={bannerImagTwo} alt="" />
//               {/* <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div> */}
//               <div
//                 className={`text-content w-full md:w-[80%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white `}
//               >
//                 <motion.div variants={intro} initial="hidden" animate="visible" className="text-center flex flex-col gap-2 md:gap-3 uppercase">
//                   <motion.p variants={childVariants} className="text-[10px] md:text-[20px] tracking-widest "> {t("headerSemiTitle")} </motion.p>
//                   <motion.h1 variants={childVariants} className={`hero-text ${currentLanguage === "ar" ? "arabic" : "english"}`}>{t("titleHero ")}</motion.h1>
//                   <motion.h1 variants={childVariants} className={`hero-text ${currentLanguage === "ar" ? "arabic" : "english"}`}>{t("subTitleHero")}</motion.h1>

//                   <motion.div variants={childVariants} className="py-3">
//                     <Link
//                       to={"/roomSearch"}
//                       className=" py-2 md:py-3  text-xs md:text-sm  px-4 border  md:px-8 md:border tracking-widest heroText hover:border-[#BE9874] hover:text-[#BE9874]"
//                     >
//                       {t("heroButton")}
//                     </Link>
//                   </motion.div>
//                 </motion.div>
//               </div>
              
//             </SwiperSlide>
//             <SwiperSlide className={`bg-cover bg-center relative cursor-pointer ${currentLanguage === 'ar' ? 'body-ar text-xl font-medium ' : 'body-en-title'}`}>
//               {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div> */}
//               <img className="w-full h-full  object-cover block  " src={bannerImagOne} alt="" />
//               <div
//                 className={`text-content w-full px-2 md:w-[60%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white `}
//               >
//                 <div className="text-center flex flex-col gap-2 md:gap-4 uppercase">
//                   <p className="text-[10px] md:text-[20px] tracking-widest "> {t("headerSemiTitleTwo")} </p>
//                   <h1 className={`hero-text ${currentLanguage === "ar" ? "arabic" : "english"}`}>{t("titleSecondImage")}</h1>
//                   <h1 className={`hero-text ${currentLanguage === "ar" ? "arabic" : "english"}`}>{t("subTitleHeroSecond")}</h1>

//                   <div className="py-3">
//                     <Link
//                       to={"/roomSearch"}
//                       className=" py-2 md:py-3  text-xs md:text-sm  px-4 border  md:px-8 md:border tracking-widest heroText hover:border-[#BE9874] hover:text-[#BE9874]"
//                     >
//                       {t("heroButton")}
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           </Swiper>
//         </div>
//         <div className="md:absolute   md:left-1/2 md:transform md:-translate-x-1/2 md:bottom-25 md:z-50 w-full">
//           {/* <SearchBar pageContext="home" /> */}
//           <Availability />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Banner;
