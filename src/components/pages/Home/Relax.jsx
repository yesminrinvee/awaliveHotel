// import relax from '../../../assets/relax.jpg'
import relaxB from "../../../assets/relaxCom.jpg";

import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Relax = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("home");
  const textAlignmentClass = currentLanguage === 'ar'
    ? 'lg:text-right text-center' // For Arabic, text is right-aligned on large screens, centered on smaller screens
    : 'lg:text-left text-center'; // For other languages, text is left-aligned on large screens, centered on smaller screens

  return (
    <section data-aos="fade-up" className="lg:max-w-6xl mx-auto py-10   text-[#2E2E2E] px-4 " data-speed="2">
      <div className=  {`flex flex-col md:flex-row  gap-10 lg:gap-20 items-center justify-center ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en  '}` } >
        <div
          className=" w-full lg:w-[50%]  min-h-[600px]   md:py-0  flex items-center justify-center mx-auto "
          style={{
            backgroundImage: `url(${relaxB})`,
            backgroundRepeat: "no-repeat", // Prevent image from repeating
            backgroundPosition: "center center",
            
            backgroundSize: "cover", // Adjust background size to fit the image within the container
            // height: "100%",
            // width: "100%"
          }}
        >
          {/* <img src={relaxB} alt="hotel-awalive-image-taif" /> */}
        </div>
        <div className="w-full   flex flex-col gap-5 md:gap-8  ">
          <div>
            <p className={`uppercase text-xs tracking-widest  ${textAlignmentClass}` }>{t("hotelRelaxSubTitle")}</p>
          </div>
          <div
            className={`   tracking-wider flex flex-col gap-3 md:w-full ${textAlignmentClass}  mx-auto md:mx-0 w-[80%]  ${currentLanguage === 'ar' ? 'body-ar  font-bold text-3xl  md:text-5xl  xl:text-5xl' : 'body-en-title text-4xl  md-text-5xl lg:text-6xl  xl:text-7xl'}   `}
            
          >
            {/* <h2>{t("hotelRelaxTitle")}</h2> */}
            <h2>{t("Relax in our")}</h2>
            <h2>{t("Hotel Resort")}</h2>
            {/* <h2>{t("hotelRelaxTitle")}</h2> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm text-center md:text-left">
            <p className="text-gray-600">{t("hotelinTaif")}</p>
            <p className="text-gray-600">{t("restaurantWithAView")}</p>
            <p className="text-gray-600">{t("poolAndGym")}</p>
            <p className="text-gray-600">{t("peacefulHotelStay")}</p>
          </div>
          

        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Relax;
