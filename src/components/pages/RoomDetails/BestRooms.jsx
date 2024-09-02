import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
import { Skeleton } from "antd";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BestRooms = () => {
    const currentLanguage = i18next.language
    const { t } = useTranslation("booking");
  const { allRooms, setLoadingAllRooms, loadingAllRooms } = useContext(AuthContext);
  const [bestRooms, setBestRooms] = useState([]);


  
  useEffect(() => {
    if (allRooms.length > 0) {
      let shuffledRooms = [...allRooms]; // Create a copy of allRooms
      shuffledRooms.sort(() => 0.5 - Math.random()); // Shuffle the array
      setBestRooms(shuffledRooms.slice(0, 2)); // Take the first two
    }
  }, [allRooms]); // Re-run this effect if allRooms changes

  // Render your component using bestRooms...
  
  return (
    <>
      {loadingAllRooms ? (
        <Skeleton active />
      ) : (
        <div className=" "dir={`${currentLanguage === "ar" ? "rtl" : "ltr"}`} >
          <p className={`text-2xl mb-4 ${currentLanguage === 'ar' ? 'body-ar font-medium  ' : 'body-en-title '} `}>{t("Best Room")}</p>
          <div className="flex flex-col  gap-5">
            {bestRooms.map((room) => (
              <div className={`flex gap-2 ${currentLanguage === 'ar' ? 'body-ar font-medium  ' : 'body-en '} `} key={room.id}>
                <img src={room.images[0]} alt={room.title} className="w-26 h-26 object-cover" />
                <div className="flex flex-col gap-2 ">
                  <p className="text-xl">{room.title} </p>
                  <p className="text-sm">{t("from")} {room.priceOptions[0].price.toLocaleString()} SR {t("per night")}</p>
                  <div>
                  <Link to={`/room/${room.id}`} className="py-[3px] px-2 text-xs bg-[#BE9874] text-white cursor-pointer">{t("bookNow")}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BestRooms;
