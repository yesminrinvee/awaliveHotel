// import React from 'react'

import { Link } from "react-router-dom";
import bannerImage from "../../../assets/5.jpg"; // Update with the actual path
import i18next from "i18next";
import { useTranslation } from "react-i18next";
// import LazyImage from "../../sharedPages/LazyImage";

const Banner = ({ data, loading }) => {
  const currentLanguage = i18next.language
  const {t} = useTranslation('promotion')

  const componentStyle = {
    backgroundImage: `url(${bannerImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover", 
  };

  

  return (
    <section className={`min-h-[calc(100vh-120px)] relative`} style={componentStyle}>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="max-w-7xl mx-auto py-20 relative ">
        <div className={`${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en'}`}>
          <div className="md:w-[50%] flex flex-col gap-6 px-2 mx-auto text-center text-white pt-20">
            <h1 className={`text-3xl text md:text-6xl capitalize ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en-title'}`}>{t("Our Promotion")}</h1>
            <p className=" text-sm md:text-lg ">{t("promotionDiscretion")}  </p>
            <div className="py-5 text-center">
              {/* <Link
                
                className="font-semibold text-xs tracking-[0.2rem] text-white uppercase bg-[#BE9874] py-2 px-6"
              >
               {t("BOOK NOW")}
              </Link> */}
            </div>
          </div>
          {loading ? (
            ""
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">

              {data.slice(0, 4).map((room) => (
                <Link to={`/room/${room._id}`} key={room._id} className="grid-cols-1 relative">
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <img src={room.images[0]} alt="" className="md:h-[200px] w-full object-cover" />
                  {/* <p className="bg-[#2E2E2E] py-1 px-4 absolute top-5 right-0 text-white text-sm">
                    {room.price} SR
                  </p> */}
                  <p className="absolute top-5 left-5 text-white bg-[#2E2E2E] text-xs tracking-widest px-5 ">{`- ${room?.discount} %`}</p>
                  <div className={`absolute bottom-5 left-5  ${currentLanguage === 'ar' ? 'body-ar  font-medium   ' : 'body-en-title font-medium '}`}>
                    <h2 className="text-lg text-white tracking-widest">
                      {room.title}
                    </h2>
                  </div>
                </Link>
              ))}

            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
