// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Tabs } from "antd";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";
// import axios from "axios";

// const PromoRoomDetails = ({ singlePromotionData, currentLanguage, loading }) => {
//   const {t} = useTranslation('promotion')
//   const [rating, setRating] = useState(0);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const { roomImage, roomName, price, numberOfGuests, breakfastAvailable, fullDetails, reviews ,_id ,priceHistory, saleTag  } = singlePromotionData;
//   console.log(singlePromotionData, "single daa ");
//   const roomId = _id

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevent form from refreshing the page
//     if (!name || !email || !message) {
//       setError('Please fill in all fields');
//       return;
//     }
//     // Add more validation as needed

//     try {
//       const response = await axios.post('/api/reviews', {
//         roomId,
//         rating,
//         name,
//         email,
//         message,
//       });
//       // Handle success (clear form, show message, etc.)
//       setRating(0);
//       setName('');
//       setEmail('');
//       setMessage('');
//       // Optionally refresh the list of reviews here
//     } catch (err) {
//       setError('An error occurred while submitting your review');
//     }
//   };

//   const onChange = (key) => {
//     console.log(key);
//   };

// //   const onMouseEnter = (index) => {
// //     setHoverRating(index);
// // };

// // const onMouseLeave = () => {
// //     setHoverRating(0);
// // };

// // const onSaveRating = (index) => {
// //     onRating(index);
// // };

//   const items = [
//     {
//       key: '1',
//       label: t('Descriptions'),
//       children: <>
//       <p className="w-full py-4">
//            {fullDetails}
//           </p>
//       </>,
//     },
//     {
//       key: '2',
//       label: t('Additional information'),
//       children: <>
//       <div className="px-4 py-5">
//           <h2 className={`text-2xl ${currentLanguage === "ar" ? "body-ar font-medium " : "body-en-title"}`}>{t("Additional information")}</h2>
//           <div className={`md:w-[50%] ${currentLanguage === "ar" ? "body-ar font-medium " : "body-en"}`}>
//             <div className="grid grid-cols-2 gap-2 py-5">
//               <p className="capitalize">{t("Guests")}</p>
//               <p>1 Guest, 2 Guests, 3 Guests</p>
//             </div>
//             <div className="grid grid-cols-2 gap-2">
//               <p>{t("Breakfast")}</p>
//               <p>{breakfastAvailable}</p>
//             </div>
//           </div>
//         </div>
//       </>,
//     },
//     {
//       key: '3',
//       label: t('Reviews'),
//       children: <>
//       <div className=" py-5">
//           <p className={`pb-5 text-2xl capitalize ${currentLanguage === "ar" ? "body-ar font-medium " : "body-en-title"}`} >{t("Reviews")}</p>
//           <div id="reviews-container">
//               {reviews?.map((review)=>(
//                 <div key={review.id}>
//                     <p>{review.rating}</p>
//                     <p>{review.comment}</p>
//                     <p>{review.username}</p>
//                 </div>
//               ))}
//            </div>
//           <form onSubmit={handleSubmit}>
//           <div className="flex flex-col gap-6 max-w-3xl " id="review-form">
//               {/* <div>
//                   <i className="fas fa-star" data-star="1"></i>
//                   <i className="fas fa-star" data-star="2"></i>
//                   <i className="fas fa-star" data-star="3"></i>
//                   <i className="fas fa-star" data-star="4"></i>
//                   <i className="fas fa-star" data-star="5"></i>
//               </div> */}
//               {/* <div className="star-rating">
//             {[...Array(count)].map((star, index) => {
//                 index += 1;
//                 return (
//                     <button
//                         type="button"
//                         key={index}
//                         className={(index <= (hoverRating || rating)) ? "on" : "off"}
//                         onClick={() => onSaveRating(index)}
//                         onMouseEnter={() => onMouseEnter(index)}
//                         onMouseLeave={onMouseLeave}
//                     >
//                         <span className="star">&#9733;</span>
//                     </button>
//                 );
//             })}
//         </div> */}
//               <textarea onChange={(e) => setMessage(e.target.value)} className="bg-[#E8F0FE] outline-none px-5 py-5" name="message" cols="30" rows="5" placeholder={t("message")}></textarea>
//               <input  onChange={(e) => setEmail(e.target.value)} className="bg-[#E8F0FE] outline-none px-5 py-5" type="email" name="email" placeholder={t("email") }/>
//               <input onChange={(e) => setName(e.target.value)} className="bg-[#E8F0FE] outline-none px-5 py-5" type="text" name="name" placeholder={t("name")} />
//               <div>
//                   <button type="submit" className="uppercase text-s m bg-[#BE9874] px-5 py-2 text-white">{t("submit")}</button>
//               </div>
//           </div>
//           </form>
//               {error && <p>{error}</p>}
//       </div>
//       </>,
//     },
//   ];

//   return (

//     <>
//     {!loading &&(
    
//       <><section className="max-w-6xl mx-auto py-10 md:py-16">
//           <div className="flex flex-col md:flex-row gap-10 ">
//             <div className="w-full md:w-[50%] relative">
//               <img src={roomImage} alt="" className="w-full md:h-[550px] object-cover" />
//               <p className="absolute top-10 left-10 bg-[#BE9874] py-2 px-6 rounded-sm text-indigo-50 text-xs tracking-widest">{saleTag}</p>
//             </div>
//             <div className="px-4 md:w-[50%] flex flex-col gap-7">
//               <div
//                 className={` flex flex-col gap-5 text-black ${currentLanguage === "ar" ? "body-ar font-medium " : "body-en-title"}`}
//               >
//                 <h2 className="text-3xl md:text-4xl">{roomName}</h2>
//                 <div className="flex gap-2">

//                   {priceHistory && (
//                     <p className="text-xl md:text-2xl text-gray-400"><s>{priceHistory}{t("SR")}</s></p>
//                   )}
//                   <p className="text-xl md:text-2xl">{price} {t("SR")}</p>
//                 </div>
//                 <p className=" tracking-widest">{fullDetails}</p>
//               </div>
//               <div className={`flex flex-col gap-4 ${currentLanguage === "ar" ? "body-ar font-medium " : "body-en-title"}`}>
//                 <div className="flex items-center justify-between max-w-64 text-black">
//                   <label htmlFor="guest-select" className="text-xl">
//                     {t("Guests")}:
//                   </label>
//                   <select id="guest-select" className="ml-2 border rounded px-2 py-1">
//                     {numberOfGuests.map((guestOption, index) => (
//                       <option key={index} value={guestOption}>
//                         {guestOption} Guest{guestOption > 1 ? "s" : ""}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="flex items-center justify-between max-w-64">
//                   <p className="text-xl">{t("Breakfast")}</p>
//                   <p className="">{breakfastAvailable}</p>
//                 </div>

//                 <div className="flex items-center justify-between max-w-64 text-black">


//                 </div>
//                 <div className="">
//                   <Link className="tracking-wider uppercase bg-[#BE9874] text-sm py-3 px-8 text-white">{t("Reserve")}</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section><section className="max-w-6xl mx-auto pb-20"><Tabs defaultActiveKey="1" items={items} onChange={onChange} /> </section></>
//                   )}
//     </>
//   );
// };

// export default PromoRoomDetails;
