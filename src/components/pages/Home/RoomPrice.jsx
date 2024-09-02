import { useEffect, useRef,  } from "react";
import heroSlide from "../../../assets/5.jpg";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

const RoomPrice = () => {
  const currentLanguage = i18next.language
  const { t } = useTranslation("home");
    const zoomCardRef = useRef(null);

    useEffect(() => {
      const isMdScreen = () => window.innerWidth >= 768;
      // Define the callback function for the Intersection Observer
      const observerCallback = (entries) => {
        entries.forEach(entry => {
          // Apply the zoom effect only if on a screen larger than 'md'
          if (entry.isIntersecting && isMdScreen()) {
            entry.target.style.transform = 'scale(1.2)';
          } else {
            entry.target.style.transform = 'scale(1)';
          }
        });
      };
  
      // Create the Intersection Observer instance
      const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
  
      // Start observing the element if it exists
      if (zoomCardRef.current) {
        observer.observe(zoomCardRef.current);
      }
  
      // Clean up the observer on component unmount
      return () => {
        if (zoomCardRef.current) {
          observer.unobserve(zoomCardRef.current);
        }
      };
    }, []);

  return (
    <section
      className="text-[#2E2E2E] relative "
      style={{
        backgroundImage: `url(${heroSlide})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 "></div>
      <div className={`container mx-auto py-20 px-4 ${currentLanguage === 'ar' ? 'body-ar  font-normal ' : 'body-en '}`} >
        <div data-aos="fade-up" className="text-center pb-6 text-white">
          <p className="  tracking-[0.2rem] uppercase ">{t("OUR ROOM PRICES")}</p>
          <h2 className={`text-4xl py-4 md:text-6xl md:py-3 ${currentLanguage === 'ar' ? 'body-ar  font-bold ' : 'body-en-title '}`} >
            {t("The Best Prices")}
          </h2>
        </div>
        {/* pricing cards */}
        <div className=" max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-6 md:py-10">
          <div data-aos="zoom-in-up" className="grid-cols-1 bg-white text-center items-center py-10 flex flex-col justify-center">
            <h2 className={`text-xl md:text-2xl ${currentLanguage === 'ar' ? 'body-ar  font-bold ' : 'body-en-title '}`} >
            {t("deluxeSingleRoom.title")}
            </h2>
            <p className="py-3 md:py-4 text-sm ">
              ${" "}
              <span className="text-6xl" style={{ fontFamily: "Gilda Display, serif" }}>
                55
              </span>{" "}
              / {t("deluxeSingleRoom.price")}
            </p>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li>{t("deluxeSingleRoom.amenities one")}</li>
              <li>{t("deluxeSingleRoom.amenities two")}</li>
              <li>{t("deluxeSingleRoom.amenities tree")}</li>
              <li>{t("deluxeSingleRoom.amenities four")}</li>
              <li>{t("deluxeSingleRoom.amenities five")}</li>
              <li>{t("deluxeSingleRoom.amenities six")}</li>
              <li>{t("deluxeSingleRoom.amenities seven")}</li>
            </ul>
            <div className="py-10">
              <a href="#" className="uppercase py-3 px-4 bg-[#BE9874] hover:bg-[#2E2E2E] text-white text-sm md:text-md transition duration-300">
              {t("deluxeSingleRoom.callToAction")}
              </a>
            </div>
          </div>
          <div
            data-aos="zoom-in-up"
            className="grid-cols-1 bg-[#BE9874] text-white text-center py-10 cardScale priceBest items-center flex flex-col justify-center"
            style={{
              transition: 'transform 0.9s ease',
              transform: 'scale(1)',
            }}
            ref={zoomCardRef} 
          >
            <h2 className={`text-xl md:text-2xl ${currentLanguage === 'ar' ? 'body-ar  font-bold ' : 'body-en-title '}`}>
            {t("singleRoom.title")}
            </h2>
            <p className="py-3 text-2xl">
              ${" "}
              <span className="text-6xl" style={{ fontFamily: "Gilda Display, serif" }}>
                45
              </span>{" "}
              / {t("singleRoom.price")} 
            </p>
            <ul className="flex flex-col gap-2 text-sm ">
            <li>{t("singleRoom.amenities one")}</li>
              <li>{t("singleRoom.amenities two")}</li>
              <li>{t("singleRoom.amenities tree")}</li>
              <li>{t("singleRoom.amenities four")}</li>
              <li>{t("singleRoom.amenities five")}</li>
              <li>{t("singleRoom.amenities six")}</li>
              <li>{t("singleRoom.amenities seven")}</li>
            </ul>
            <div className="py-10">
              <a href="#" className="uppercase py-3 px-4  hover:bg-[#BE9874] bg-[#2E2E2E] text-white text-sm md:text-md transition duration-300">
              {t("singleRoom.callToAction")}
              </a>
            </div>
          </div>
          <div data-aos="fade-up" className="grid-cols-1 bg-white text-center py-10">
            <h2 className={`text-xl md:text-2xl ${currentLanguage === 'ar' ? 'body-ar  font-bold ' : 'body-en-title '}`}>
            {t("apartment.title")}
            </h2>
            <p className="py-3 text-sm">
              ${" "}
              <span className="text-6xl" style={{ fontFamily: "Gilda Display, serif" }}>
                45
              </span>{" "}
              / <span className="">{t("apartment.price")}</span>
            </p>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
            <li>{t("apartment.amenities two")}</li>
              <li>{t("apartment.amenities tree")}</li>
              <li>{t("apartment.amenities four")}</li>
              <li>{t("apartment.amenities five")}</li>
              <li>{t("apartment.amenities six")}</li>
              <li>{t("apartment.amenities seven")}</li>
            </ul>
            <div className="py-10">
              <a href="#" className="uppercase py-3 px-4 bg-[#BE9874] hover:bg-[#2E2E2E] text-white text-sm md:text-md transition duration-300">
              {t("apartment.callToAction")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomPrice;
