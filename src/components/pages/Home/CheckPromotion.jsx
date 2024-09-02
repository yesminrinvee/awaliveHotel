// // import React from 'react'
// import checkImg from "../../../assets/check.jpg";
// import singnature from "../../../assets/signature.png";
// import caffeeBar from "../../../assets/cofeeCom.jpg";
// import luxuryRoom from "../../../assets/luxuryRoomCard.webp";
// import familyRoom from "../../../assets/familyCard.jpg";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import placeholderImage from "../../../assets/hotel-service.png";
// import { Link } from "react-router-dom";

// const CheckPromotion = ({ promotionsData, promotionLoading, promotionError }) => {
//   const currentLanguage = i18next.language;
//   const { t } = useTranslation("home");

//   const promotionData = promotionsData.slice(0, 3);

//   return (
//     <>
//       <section className="container mx-auto pt-16 md:py-20 text-[#2E2E2E] px-4">
//         <div
//           className={` flex flex-col lg:flex-row items-center justify-center gap-10 ${
//             currentLanguage === "ar" ? "body-ar  font-normal " : "body-en "
//           }`}
//         >
//           <div className="lg:w-[35%] text-center md:text-start">
//             <p className=" pb-4 md:pb-6 text-sm tracking-[0.2rem]">{t("summerOffers")}</p>
//             <div
//               className={`flex flex-col text-center items-center justify-center md:text-left md:items-start ${
//                 currentLanguage === "ar" ? "body-ar  font-bold " : "body-en-title "
//               }`}
//             >
//               <h2 className="text-2xl md:text-4xl  lg:text-5xl mb-3 md:mb-5  ">{t("Check The")}</h2>
//               <h3 className="text-2xl md:text-4xl  lg:text-5xl   ">{t("Promotions")}</h3>
//             </div>
//             <p className="py-4 md:py-8 text-sm text-gray-400">{t("getawayDescription")}</p>
//             <div className="flex items-center gap-10">
//               <img src={checkImg} alt="" className="rounded-full w-20" />
//               <img src={singnature} alt="signature" className="w-[50%]" />
//             </div>
//           </div>
//           <div className=" lg:w-[65%] relative mx-auto ">
//             {/* <img src={caffeeBar} alt="coffee"  className="w-full md:w-[50%]"loading='lazy' /> */}
//             <LazyLoadImage
//               className="w-full object-contain "
//               src={caffeeBar}
//               alt={`awalive coffee bar`}
//               effect="blur"
//               placeholderSrc={placeholderImage}
//             />

//             <div>
//               {promotionLoading ? (
//                 <div>Loading..</div>
//               ) : (
//                 <div
//                   className={`lg:absolute overflow-hidden ${
//                     currentLanguage === "ar" ? "left-0" : "right-0"
//                   } my-20 md:my-0  md top-40 w-full  lg:w-[50%] flex flex-col gap-10`}
//                 >
//                   {promotionData.slice(0, 3).map((room) => (
//                     <Link to={`/room/${room.id}`} key={room._id} data-aos="fade-left" data-aos-duration="900">
//                       <div className="grid grid-cols-4 gap-6 items-center justify-center ">
//                         <img src={room.images[0]} alt="" className="col-span-1 w-70" />
//                         <div className="col-span-2">
//                           <p className="text-xs tracking-widest">{room.tags[0]}</p>
//                           <p className={`text-xl ${currentLanguage === "ar" ? "body-ar font-normal" : "body-en-title"}`}>{room.title}</p>
//                         </div>
//                         <p className="bg-[#2E2E2E] py-1 px-3 col-span-1 text-white text-center text-xs md:text-sm">
//                           {t("SR")} {room.priceOptions[0].price}
//                         </p>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default CheckPromotion;
