import { Link } from "react-router-dom";
import img from "../../../assets/5.jpg";
import imgAVT from "../../../assets/check.jpg";
import bgim from "../../../assets/peralxCom.jpg";
// import roomImg from "../../../assets/awaliveRoom.jpg ";
import roomImg from "../../../assets/awaliveRoom.jpg";
import roomImg2 from "../../../assets/DoubleRoomCard.jpg";
import keyImg from "../../../assets/icon-16.png";
import lagg from "../../../assets/icon-15.png";
import ser from "../../../assets/icon-17.png";
import wait from "../../../assets/icon-18.png";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const BestPrice = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("about");

  const { ref, inView } = useInView({
    /* Optional settings: 
      threshold: 0, // Trigger the animation when the first pixel appears
      triggerOnce: true // Ensures animation only occurs once
    */
    threshold: 0.5,
    triggerOnce: true,
  });

  // const localizeNumber = (number) => {
  //   return number.toLocaleString(currentLanguage === "ar" ? "ar-EG" : "en-US");
  // };

  return (
    <>
      <section className="bg-[#F9F9F9] py-10 md:py-20" style={{ fontFamily: "Gilda Display, serif" }}>
        <div className="max-w-7xl mx-auto px-1 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Column */}
          <div className={`space-y-4 py-10 px-2  ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en '}`}>
            <p className={`text-sm tracking-[0.2rem] text-center md:text-start `}>{t("hotelFacilities.subtitle")}</p>
            <h2 className={`text-3xl md:text-5xl  text-center md:text-start text-black pb-4 ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`}>{t("hotelFacilities.title")}</h2>
            <p className="text-xs md:text-sm text-center md:text-start text-gray-400  pb-5">{t("hotelFacilities.description")}</p>
            <div className="flex flex-col gap-3">
              <div ref={ref} className="w-full bg-gray-200  h-8 dark:bg-gray-700">
                <div className={`bg-[#2E2E2E] h-8  transition-all duration-1000 ease-in-out ${inView ? `w-[${95}]` : "w-0"}`}>
                  <div className="flex justify-between items-center h-full text-white px-2 text-xs ">
                    <p>{t("roomService.label")}</p>
                    {inView && (
                      <CountUp start={0} end={95} delay={0} duration={2.5}>
                        {({ countUpRef }) => <div className="text-sm font-medium" ref={countUpRef} />}
                      </CountUp>
                    )}
                  </div>
                </div>
              </div>

              <div ref={ref} className="w-full bg-gray-200  h-8 dark:bg-gray-700 my-2">
                <div className={`bg-[#BE9874] h-8  transition-all duration-1000 ease-in-out ${inView ? `w-[${90}%]` : "w-0"}`}>
                  <div className="flex justify-between items-center h-full text-white px-2 text-xs ">
                    <p>{t("breakfastIncluded.label")}</p>
                    {inView && (
                      <CountUp start={0} end={90} delay={0} duration={2.5}>
                        {({ countUpRef }) => <div className="text-sm font-medium" ref={countUpRef} />}
                      </CountUp>
                    )}
                  </div>
                </div>
              </div>
              <div ref={ref} className="w-full bg-gray-200  h-8 dark:bg-gray-700">
                <div className={`bg-[#2E2E2E] h-8  transition-all duration-1000 ease-in-out ${inView ? `w-[${95}%]` : "w-0"}`}>
                  <div className="flex justify-between items-center h-full text-white px-2 text-xs ">
                    <p>{t("laundryIroning.label")}</p>
                    {inView && (
                      <CountUp start={0} end={95} delay={0} duration={2.5}>
                        {({ countUpRef }) => <div className="text-sm font-medium" ref={countUpRef} />}
                      </CountUp>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <img src={img} alt="Luxury Room" className="w-full h-[450px] object-cover " />
            <div className="absolute inset-0 bg-[#BE9874] bg-opacity-95 flex flex-col justify-center items-center text-white p-4">
              <div className="md:w-[80%] mx-auto flex flex-col justify-center gap-3 items-center text-center">
                <img src={imgAVT} alt="Customer Avatar" className="rounded-full w-16 h-16" />
                {/* <p className="text-sm pt-4">{t("testimonialQuote")}</p> */}
                <ul className="flex text-lg pb-4">
                  <li>★</li>
                  <li>★</li>
                  <li>★</li>
                  <li>★</li>
                  <li>★</li>
                </ul>
                <h3 className="text-sm">{t("guestExperience.testimonial")}</h3>
                <p className="text-xs"> {t("guestExperience.guestInfo")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div
          className={`h-[calc(100vh-30vh)] flex items-center relative `}
          style={{
            backgroundImage: `url(${bgim})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            fontFamily: "Gilda Display, serif",
          }}
        >
          <div className={`absolute top-0 left-0 w-full h-full bg-black opacity-70  `}></div>
          <div className=" max-w-2xl w-full px-1  text-center text-white flex flex-col gap-1 md:gap-4 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
            <h1 className={`text-3xl md:text-5xl capitalize  ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`}>{t("careText")}</h1>
            <h2 className={` text-3xl md:text-5xl capitalize  ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`}>{t("subCareText")}</h2>
            <p className={`text-sm text-gray-300 py-3 ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en '}`}>{t("careTextDetails")}</p>
            <div className="py-4">
              <Link to={"/contact"} className="uppercase text-white bg-[#BE9874] py-3 px-6 text-sm ">
                {t("contact_us")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`max-w-7xl mx-auto px-2 md:px-0 py-10 md:py-16 ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en '}`} >
        <div className="flex flex-col md:flex-row gap-6 justify-between  items-center md:h-[300px]">
          <div className={`w-full md:w-[40%] flex flex-col gap-3 text-center md:items-end text-black text-3xl  md:text-5xl ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`}>
            <p>{t("make_the_best")}</p>
            <p>{t("for_our_guests")}</p>
            <p>{t("come_visit_our")}</p>
            <p>{t("sea_hotel")}</p>
          </div>
          <div className="md:w-[60%] grid grid-col-1 md:grid-cols-2 gap-6 h-full">
            <div className=" h-full relative">
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
              <img src={roomImg} alt="" className="h-full w-full" />
              <div className="absolute bottom-5 left-3 text-white">
                <p className="text-xl">{t("roomService.label")} </p>
                <p className="text-sm text-gray-400">Included</p>
              </div>
            </div>
            <div className=" h-full relative">
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
              <img src={roomImg2} alt="" className="h-full w-full" />
              <div className="absolute bottom-5 left-3 text-white">
                <p className="text-xl">{t("laundryIroning.label")}</p>
                <p className="text-sm text-gray-400">Additional</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] mx-auto">
          <div className="pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col md:flex-row  gap-4 items-center ">
                <img src={keyImg} alt="icon" className="w-14 md:w-20" />
                <div className="text-center md:text-start">
                  <p className="text-sm text-gray-400">{t("features.keyDescription")}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row  gap-4 items-center ">
                <img src={lagg} alt="icon" className="w-14 md:w-20" />
                <div className="text-center md:text-start">
                  <p className="text-sm  text-gray-400">{t("features.luggageDescription")}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row  gap-4 items-center ">
                <img src={ser} alt="icon" className="w-14 md:w-20" />
                <div className="text-center md:text-start">
                  <p className="text-sm text-gray-400">{t("features.serviceDescription")}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row  gap-4 items-center ">
                <img src={wait} alt="icon" className="w-14 md:w-20" />
                <div className="text-center md:text-start">
                  <p className="text-sm text-gray-400">{t("features.waitersDescription")}</p>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default BestPrice;
