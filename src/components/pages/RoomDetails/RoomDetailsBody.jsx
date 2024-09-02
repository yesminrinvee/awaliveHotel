/* eslint-disable react/prop-types */
import RoomImageSlider from "./RoomImageSlider";

import RoomDate from "./RoomDate";
import { CheckOutlined, UserOutlined, ArrowsAltOutlined, CalendarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Image } from "antd";
import { useState } from "react";
import { LuHome, LuUserCircle } from "react-icons/lu";
import { CiViewTable } from "react-icons/ci";
import pool from '../../../../public/img/swmming-pool.png'
import tv from '../../../../public/img/television .png'
import drink from '../../../../public/img/welcome-drink.png'
import bath from '../../../../public/img/private-bathroom.png'
import noSmoking from '../../../../public/img/no-smoking.png'

const RoomDetailsBody = ({ singleRoomDetails }) => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("booking");
  

  const { description, features, images, maxGuests, priceOptions,priceHistory,services, size } = singleRoomDetails;

 

 

  return (
    <>
      <div className=" lg:relative flex flex-col-reverse lg:flex-row gap-5 py-5 ">
        <div className="lg:w-2/3 lg:overflow-y-auto lg:flex-grow ">
          <RoomImageSlider images={images} />

          {/* Facilities   */}
          <div >
            <div className="flex justify-between  py-2 px-4 md:py-4 md:px-20 ">
              <div className="flex flex-col items-center gap-3 ">
                <p className="text-2xl">
                  
                  {/* <UserOutlined />{" "} */}
                  <LuUserCircle className="text-3xl md:text-4xl text-gray-400 " />
                </p>{" "}
                <div className="flex gap-2 ">
                  <p>{maxGuests}</p>
                  <p className="uppercase tracking-widest text-sm  ">{t("guest")}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <p className="text-xl md:text-2xl">
                  <CiViewTable className=" text-3xl md:text-4xl text-gray-400" />
                </p>{" "}
                <div className="flex gap-1">
                  <p className="uppercase tracking-widest text-sm ">{size}</p>
                  <p className=" tracking-widest text-sm  ">
                  {'m²'}
                </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center">
                {/* <p className="text-xl  md:text-xl">{t("SAR")} </p>{" "} */}
                <LuHome className="text-3xl md:text-4xl text-gray-400" />
                <div className="flex gap-2">
                  {/* for promotion */}
                {/* {priceHistory && (
                  <s className="uppercase tracking-widest text-sm  ">
                  {priceHistory}
                </s>
                )} */}
                <p className="uppercase tracking-widest text-sm  ">
                  {priceOptions[0].price}{" "}{t("SAR")}

                </p>
                </div>
                
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl  md:text-2xl">
                  <CalendarOutlined className="text-3xl md:text-4xl text-gray-400" />{" "}
                </p>{" "}
              </div>
            </div>
          </div>
          {/* Facilities end  */}
          <hr />
          <p
            dir={`${currentLanguage === "ar" ? "rtl" : "ltr"}`}
            className={`py-3 px-3 md:px-0 text-sm leading-7  ${currentLanguage === "ar" ? "body-ar" : "body-en"} `}
          >
            {description}
          </p>
          <hr />
          <div dir={`${currentLanguage === "ar" ? "rtl" : "ltr"}`} className=" mt-4 pb-4 px-3 md:px-0">
            <h2 className={`text-2xl  py-5 md:py-4 ${currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"} `}>{t("roomService")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              <div className="flex gap-5 items-center ">
                <img className="w-8 h-8" src={pool} alt="" />
                <p>{t("Swimming pool")}</p>
              </div>
              <div className="flex gap-5 items-center ">
                <img className="w-8 h-8" src={tv} alt="" />
                <p>{t("Television")}</p>
                
              </div>
              <div className="flex gap-5 items-center ">
                <img className="w-8 h-8" src={noSmoking} alt="" />
                <p>{t("No Smoking")}</p>
              
              </div>
              <div className="flex gap-5 items-center ">
                <img className="w-8 h-8" src={bath} alt="" />
                <p>{t("Privet Bathroom")}</p>
               
              </div>
              <div className="flex gap-5 items-center ">
                <img className="w-8 h-8" src={drink} alt="" />
                <p>{t("Welcome Drinks")}</p>
               
              </div>
              {/* {features?.map((feature, index) => (
                <div key={index} className="flex gap-2 items-center text-xs ">
                  <CheckOutlined className="text-green-400" />
                  <p className={`text-sm ${currentLanguage === "ar" ? "body-ar" : "body-en"}`}>{feature}</p>
                </div>
              ))} */}
            </div>
          </div>
          <hr />
          {/* <div dir={`${currentLanguage === "ar" ? "rtl" : "ltr"}`} className="">
            <h2 className={`text-2xl  py-5 md:py-4 ${currentLanguage === "ar" ? "body-ar" : "body-en"} `}>{t("roomService")}</h2>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {displayedServices.map((service, index) => (
                  <div key={index} className="flex gap-2 items-center text-xs">
                    <CheckOutlined className="text-green-400" />
                    <p className={`text-sm ${currentLanguage === "ar" ? "body-ar" : "body-en"}`}>{service}</p>
                  </div>
                ))}
              </div>
              {services.length > 4 && (
                <button className="mt-2 text-sm text-[#5c5c5c] hover:text-[#817070]" onClick={toggleShowAll}>
                  {showAll ? "See Less" : "Show More"}
                </button>
              )}
            </div>
          </div> */}

          {/* Around hotels start */}

          {/* Around hotels end */}
        </div>
        <div className=" lg:w-1/3  flex flex-col  ">
          <RoomDate singleRoomDetails={singleRoomDetails} />
          <div dir={`${currentLanguage === "ar" ? "rtl" : "ltr"}`} className="hidden md:flex py-2">
            <Image.PreviewGroup>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {images.map((url, index) => (
                  <Image key={index} width={100} height={80} src={url} style={{ marginBottom: "10px" }} />
                ))}
              </div>
            </Image.PreviewGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetailsBody;
