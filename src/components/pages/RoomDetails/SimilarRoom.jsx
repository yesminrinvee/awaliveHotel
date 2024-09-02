import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholerImage from "../../../assets/hotel-service.png";
import i18next from "i18next";
import CoverSlider from "../SearchRoooms/CoverSlider";
import { LuUserCircle } from "react-icons/lu";
import { CiViewTable } from "react-icons/ci";
import pool from '/img/swmming-pool.png'
import drinks from '/img/welcome-drink.png'
import smoking from '/img/no-smoking.png'
import bath from '/img/private-bathroom.png'

const SimilarRoom = ({ currentRoomId }) => {
  const currentLanguage = i18next.language
  const { allRooms, setLoadingAllRooms, loadingAllRooms } = useContext(AuthContext);
  const [similarRooms, setSimilarRooms] = useState(allRooms);
  const { t } = useTranslation("booking");

  useEffect(() => {
    const fetchRoomRates = async () => {
      setLoadingAllRooms(true);
      try {
        // Select first 3 rooms, ensuring the current room is not included
        const selectedRooms = allRooms.slice(0, 3);
        setSimilarRooms(selectedRooms);
        setLoadingAllRooms(false);
      } catch (error) {
        console.error("Error fetching room rates:", error);
      } finally {
        setLoadingAllRooms(false);
      }
    };

    fetchRoomRates();
  }, [currentRoomId, allRooms, setSimilarRooms, setLoadingAllRooms]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {loadingAllRooms ? (
        <Skeleton active />
      ) : (
        similarRooms?.map((room) => (
          
          <div
              key={room.id}
              className={`col-span-1 border border-gray-200 flex flex-col gap-3 card ${currentLanguage === 'ar' ? 'body-ar' : 'body-en'} `}
              data-price={room.priceOptions[0].price}
              // className={}
            >
              <CoverSlider images={room.images} />
              <div className="px-4 py-6 flex flex-col gap-3"  >
                <h2 className={`text-2xl md:text-2xl  text-slate-900 capitalize ${currentLanguage === 'ar' ? 'body-ar font-medium' : 'body-en-title'} `}>{room.title}</h2>
                <div className="flex gap-10 text-gray-900 ">
                  <div className="flex gap-2 items-center justify-center">
                    
                    <LuUserCircle className="text-2xl text-gray-400 " />
                    
                    <p>{room.maxGuests}</p>
                    <p className="uppercase text-xs">{t("guest")}</p>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <p className="text-xl md:text-2xl">
                      {/* <ArrowsAltOutlined />{" "} */}
                      <CiViewTable className="text-gray-400" />
                    </p>{" "}
                    <p>{room.size}</p>
                  </div>
                </div>

                <p className="text-sm py-3 ">
                  {room.description.length > 100 ? `${room.description.slice(0, 100)}...` : room.description}
                </p>
                <div>
                  <Link
                    to={`/room/${room.id}`}
                    className="px-4 py-2 md:px-6 md:py-2  border-2 border-[#1C1C1C] text-[#1C1C1C] uppercase text-xs tracking-widest font-semibold  "
                  >
                    {t("bookNowFor")}{" "}
                    {/* Book Now from  */}
                    <strong>
                      {currentLanguage === "en"
                        ? room.priceOptions[0].price.toLocaleString()
                        : room.priceOptions[0].price.toLocaleString("ar-EG")}
                    </strong>{" "}
                    {room.priceOptions[0].currency}
                  </Link>
                </div>
                {/* <hr className="mt-2" /> */}
              </div>
              
            </div>
        ))
      )}
    </div>
  );
};

export default SimilarRoom;
