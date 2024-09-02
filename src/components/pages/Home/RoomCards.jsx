/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderImage from "../../../assets/hotel-service.png";
import { Skeleton } from "antd";

const RoomCards = ({ rooms, loadingAllRooms }) => {
  const { t } = useTranslation("home");
  const currentLanguage = i18next.language;

  const skeletonCount = 6;

  return (
    <section className="container mx-auto px-4">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 ${
          currentLanguage === "ar" ? "body-ar  font-medium " : "body-en-title "
        }`}
      >
        {loadingAllRooms
          ? Array.from({ length: skeletonCount }, (_, index) => <Skeleton key={index} active />)
          : rooms?.map((room) => (
              // <div className="transition duration-300 transform hover:scale-75">
              <Link
                data-aos="fade-up"
                key={room.id}
                to={`/room/${room.id}`}
                className="grid-cols-1 cursor-pointer relative "
                style={{
                  transition: "transform 0.3s ease",
                  transform: "scale(1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <LazyLoadImage
                  className="w-full h-[300px] object-cover relative"
                  src={room.images[0]}
                  alt={`awalive ${room.images[0]}`}
                  effect="blur"
                  placeholderSrc={placeholderImage}
                />
                {/* <div className="absolute top-0 left-0 w-full h-full hover:bg-black transition duration-500 opacity-40"></div> */}
                <p
                  className={`bg-[#2E2E2E] py-2 px-2 absolute top-5  ${
                    currentLanguage === "ar" ? "left-5 md:left-10" : "right-5 md:right-10"
                  } text-white text-xs tracking-widest`}
                >
                  {t("from")} {room.priceOptions[0].price.toLocaleString()} {t("SAR")}
                  {/* {currentLanguage === "en"
                    ? room.priceOptions[0].price.toLocaleString()
                    : room.priceOptions[0].price.toLocaleString("ar-EG")}{" "}
                  {t("SAR")} */}
                </p>
                {/* show discount  */}
                {/* {room.discount && (
                  <p
                    className={`bg-[#fd4444] py-2 px-6 absolute top-5  ${
                      currentLanguage === "ar" ? "right-0" : "left-0"
                    } text-white text-xs tracking-widest`}
                  >
                    {t("Upto -")} {room.discount} {t("%")}
                  </p>
                )} */}

                <div className={`absolute bottom-5 ${currentLanguage === "ar" ? "right-4" : "left-4"} `}>
                  <h2
                    className={`text-xl md:text-2xl text-white py-2  ${
                      currentLanguage === "ar" ? "body-ar  font-semibold " : "body-en-title "
                    }`}
                  >
                    {room.title}
                  </h2>
                  <div className="flex gap-2 md:gap-3 items-center text-white text-md md:text-xl">
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </p>
                    <p className="text-sm tracking-widest">
                       {t("guest")} {room.maxGuests}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                      />
                    </svg>
                    <p className="text-xs md:text-ms tracking-widest">{room.size} </p>
                  </div>
                </div>
              </Link>
              // </div>
            ))}
      </div>
    </section>
  );
};

export default RoomCards;
