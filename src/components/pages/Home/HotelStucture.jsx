import structure from "../../../assets/Structure.webp";
import structure2 from "../../../assets/structure-2.webp";
import key16 from "../../../assets/icon-16.png";
import Lag15 from "../../../assets/icon-15.png";
import Ser17 from "../../../assets/icon-17.png";
import Wait18 from "../../../assets/icon-18.png";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const HotelStucture = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("home");

  const localizeNumber = (number) => {
    return number.toLocaleString(currentLanguage === "ar" ? "ar-EG" : "en-US");
  };

  // Create a ref for the section using Intersection Observer
  const { ref, inView } = useInView({
    /* Optional settings: 
      threshold: 0, // Trigger the animation when the first pixel appears
      triggerOnce: true // Ensures animation only occurs once
    */
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section className="max-w-6xl  mx-auto my-10 md:my-27 px-4">
      <div className={`flex flex-col lg:flex-row gap-10 ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en '}`}>
        <div className="lg:w-[50%]  flex flex-row gap-4 items-center  relative overflow-hidden">
          <img src={structure} alt="" className="w-[50%]" />
          <div
            ref={ref}
            className="w-20 md:w-28 bg-white text-black py-4  md:py-10  flex flex-col gap-3 justify-between text-center absolute left-1/2 transform -translate-x-1/2"
          >
            <div className="">
              <p className={`text-3xl font-semibold `} style={{ fontFamily: "Gilda Display, serif" }}>
                <CountUp start={0} end={inView ? 260 : 0} duration={2.75} preserveValue />
              </p>
              <p className="text-xs tracking-widest uppercase">{t("rooms.label")}</p>
            </div>
            <div>
              <p className="text-3xl font-semibold" style={{ fontFamily: "Gilda Display, serif" }}>
                <CountUp start={0} end={inView ? 2 : 0} duration={2.75} preserveValue />
              </p>
              <p className="text-xs tracking-widest uppercase">{t("restaurant.label")}</p>
            </div>
            <div>
              <p className="text-3xl font-semibold" style={{ fontFamily: "Gilda Display, serif" }}>
                <CountUp start={0} end={inView ? 2 : 0} duration={2.75} preserveValue />
              </p>
              <p className="text-xs tracking-widest uppercase">{t("h24.label")}</p>
            </div>
            <div>
              <p className="text-3xl font-semibold" style={{ fontFamily: "Gilda Display, serif" }}>
                <CountUp start={0} end={inView ? 1 : 0} duration={2.75} preserveValue />
              </p>
              <p className="text-[10px] md:text-xs  uppercase">{t("suites.label")}</p>
            </div>
          </div>
          <img src={structure2} alt="" className="w-[50%]" />
        </div>
        <div ref={ref} className="lg:w-[50%] flex flex-col gap-3 md:gap-8 justify-center   ">
          <p className=" text-sm tracking-[0.2rem] uppercase text-center md:text-start">{t("discover")}</p>
          <h2 className={`text-3xl md:text-6xl text-black text-center md:text-start ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`} >
            {/* {t("discoverTitle")} */}
            {t("The Structure")}

          </h2>
          <p className="text-sm text-gray-400 text-center md:text-start">{t("discoverSubtitle")}</p>
          

          

          <div className="flex flex-col gap-3">
          <div ref={ref} className="w-full bg-gray-200  h-8 dark:bg-gray-700">
            <div className={`bg-[#2E2E2E] h-8  transition-all duration-1000 ease-in-out ${inView ? `w-[${100}%]` : "w-0"}`}>
              <div className="flex justify-between items-center h-full text-white px-2 text-xs ">
                <p>{t("roomService.label")}</p>
                {inView && (
                  <CountUp start={0} end={100} delay={0} duration={2.5}>
                    {({ countUpRef }) => <div className="text-sm font-medium" ref={countUpRef} />}
                  </CountUp>
                )}
              </div>
            </div>
          </div>

          <div ref={ref} className="w-full bg-gray-200  h-8 dark:bg-gray-700 my-2" >
            <div className={`bg-[#BE9874] h-8  transition-all duration-1000 ease-in-out ${inView ? `w-[${100}%]` : "w-0"}`}>
              <div className="flex justify-between items-center h-full text-white px-2 text-xs ">
              <p>{t("breakfastIncluded.label")}</p>
                {inView && (
                  <CountUp start={0} end={100} delay={0} duration={2.5}>
                    {({ countUpRef }) => <div className="text-sm font-medium" ref={countUpRef} />}
                  </CountUp>
                )}
              </div>
            </div>
          </div>
          <div ref={ref} className="w-full bg-gray-200  h-8 dark:bg-gray-700" >
            <div className={`bg-[#2E2E2E] h-8  transition-all duration-1000 ease-in-out ${inView ? `w-[${100}%]` : "w-0"}`}>
              <div className="flex justify-between items-center h-full text-white px-2 text-xs ">
              <p>{t("laundryIroning.label")}</p>
                {inView && (
                  <CountUp start={0} end={100} delay={0} duration={2.5}>
                    {({ countUpRef }) => <div className="text-sm font-medium" ref={countUpRef} />}
                  </CountUp>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className={`mt-10 md:mt-20 ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en '}`}>
        <div className="grid gap-5 md:gap-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center text-center md:text-start">
            <img src={key16} alt="Smart Key Icon" className="w-20 md:w-28" />
            <div>
              <p className={`text-xl md:text-xl font-semibold py-4 ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`} >
                {t("keyFeatures.smartKey.title")}
              </p>
              <p className="text-xs text-gray-400">{t("keyFeatures.smartKey.description")}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center text-center md:text-start ">
            <img src={Lag15} alt="Luggage Storage Icon" className="w-20 md:w-28" />
            <div>
              <p className={`text-xl md:text-xl font-semibold py-4 ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`}>
                {t("keyFeatures.luggageStorage.title")}
              </p>
              <p className="text-xs text-gray-400">{t("keyFeatures.luggageStorage.description")}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center text-center md:text-start ">
            <img src={Ser17} alt="Room Service Icon" className="w-20 md:w-28" />
            <div>
              <p className={`text-xl md:text-xl font-semibold py-4 ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`}>
                {t("keyFeatures.roomService.title")}
              </p>
              <p className="text-xs text-gray-400">{t("keyFeatures.roomService.description")}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center  text-center md:text-start">
            <img src={Wait18} alt="Disinfection Icon" className="w-20 md:w-28" />
            <div>
              <p className={`text-xl md:text-xl font-semibold py-4 ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`}>
                {t("keyFeatures.disinfection.title")}
              </p>
              <p className="text-xs text-gray-400">{t("keyFeatures.disinfection.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelStucture;
