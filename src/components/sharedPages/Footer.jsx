import { useTranslation } from "react-i18next";
import PageAnimation from "../PageAnimation/PageAnimation";
import { CiFacebook, CiInstagram, CiYoutube } from "react-icons/ci";
import twitterImage from "../../assets/x.png";

import i18next from "i18next";

const Footer = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("footer");

  const footerLinks_en = ["Home", "Romms & Suites", "Restaurants & Cafés", "Facilities & Services", "Banquets & Meetings"];
  const footerLinks_ar = ["الرئيسية", "الغرف والأجنحة", "الخدمات والمرافق", "الطاعم والمقاهي", "الحفلات والإجتماعات"];

  return (
    <>
      <PageAnimation>
        <section className={`bg-[#1D1D1D] ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '} `} >
          <div className="container mx-auto">
            <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-3 text-white text-center gap-2">
              <div className="">
                <p className="text-lg md:text-xl capitalize">{t("phoneSupport")}</p>
                <p className="text-xs md:text-sm text-gray-400 capitalize">{t("phoneSupportSubTitle")}</p>
                <p dir="ltr" className="py-3 text-lg md:text-xl">+ 966 12 7375555</p>
              </div>
              <div className="">
                <p className="text-lg md:text-xl capitalize">{t("connectWithUs")}</p>
                <p className="text-xs md:text-sm text-gray-400 capitalize">{t("connectWithUsSubTitle")}</p>
                <ul className="py-3 text-lg md:text-xl">
                  <li className="flex gap-5 justify-center">
                    {/* <i className="fab fa-facebook"></i> */}
                    <a href="https://www.facebook.com/awaliv.taif" target="_blank"><CiFacebook size={30} className="cursor-pointer" /></a>
            <a href="https://www.instagram.com/awaliv.hotel/" target="_blank"><CiInstagram size={30} className="cursor-pointer" /></a>
            <a href="https://www.youtube.com/watch?v=2AD40BCejhI" target="_blank"><CiYoutube size={30} className="cursor-pointer" /></a>
            <a href="https://x.com/awalivhotels" target="_blank"> <img className="w-7 h-7" src={twitterImage} alt="" /></a>
                    
                  </li>
                </ul>
              </div>
              <div className="" style={{ fontFamily: "Gilda Display, serif" }}>
                <p className="text-lg md:text-xl capitalize">{t("newsletter")}</p>
                <p className="text-xs md:text-sm text-gray-400 capitalize">{t("newsletterSubTitle")}</p>
                <div className="py-3 text-lg md:text-xl flex justify-center  ">
                  <input
                    className="  bg-black text-sm w-full px-2"
                    type="text"
                    name=""
                    id=""
                    placeholder={t("newsletterPlaceholder")}
                  />
                  <button className="uppercase bg-[#BE9874] py-2 px-4 text-sm  ">{t("subscribeButton")}</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-[#151516] py-4">
          <div className="container mx-auto px-2 md:px-12 flex flex-col md:flex-row justify-between ">
            <ul className="flex flex-wrap text-white text-xs md:text-sm mb-4 md:mb-0">
              {currentLanguage === "ar"
                ? footerLinks_ar.map((link, index) => (
                    <li key={index} className="mr-2 md:mr-6">
                      <a href="/roomSearch">{t(link)}</a>
                    </li>
                  ))
                : footerLinks_en.map((link, index) => (
                    <li key={index} className="mr-6">
                      <a href="/roomSearch">{t(link)}</a>
                    </li>
                  ))}
            </ul>
            <div className="flex gap-4 text-white justify-center">
            <a href="https://www.facebook.com/awaliv.taif" target="_blank"><CiFacebook size={20} className="cursor-pointer" /></a>
            <a href="https://www.instagram.com/awaliv.hotel/" target="_blank"><CiInstagram size={20} className="cursor-pointer" /></a>
            <a href="https://www.youtube.com/watch?v=2AD40BCejhI" target="_blank"><CiYoutube size={20} className="cursor-pointer" /></a>
            <a href="https://x.com/awalivhotels" target="_blank"> <img className="w-4.5 h-4.5" src={twitterImage} alt="" /></a>
          
            </div>
          </div>
        </footer>
      </PageAnimation>
    </>
  );
};

export default Footer;
