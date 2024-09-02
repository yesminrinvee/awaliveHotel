import i18next from "i18next";
import relaxAreaImage from "../../../assets/parallax-8-1.jpeg";
import relaxAreaImage2 from "../../../assets/restaurant.jpg";
import { useTranslation } from "react-i18next";
// import LazyImage from '../../sharedPages/LazyImage'

const RelaxArea = () => {
    const currentLanguage = i18next.language
    const {t} = useTranslation('promotion')

    const componentStyleOne = {
        backgroundImage: `url(${relaxAreaImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "cover", 
      };
    const componentStyleTwo = {
        backgroundImage: `url(${relaxAreaImage2})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "cover", 
      };


  return (
    <section >
      <div className="grid grid-cols-1 md:grid-cols-2 h-[350px]">
        <div className="relative w-full h-full" style={componentStyleOne}>
          {/* <img src={relaxAreaImage} alt="" className=" object-bottom" /> */}

          <div className=" flex  flex-col gap-5 items-center justify-center h-full text-white">
            <p className="text-xs tracking-widest">{t("FREE WIFI")}</p>
            <h2 className={`text-6xl ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title'}`}>{t("Relax Area")}</h2>
            <div>
              <a href="#" className="bg-[#BE9874] py-2 px-4 tracking-widest text-black text-xs md:text-sm">
              {t("Read More")}{" "}
              </a>
            </div>
          </div>
        </div>

        <div className=" relative"  style={componentStyleTwo}>
          {/* <img src={relaxAreaImage2} alt="" /> */}
          <div className="absolute inset-0 bg-black opacity-20"></div>

          <div className="relative flex  flex-col gap-5 items-center justify-center h-full text-white">
            <p className="text-xs tracking-widest">{t("FREE WIFI")}</p>
            <h2 className={`text-6xl ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title'}`}>{t("Breakfast")}</h2>
            <div>
              <a href="#" className="bg-black py-2 px-4 tracking-widest text-white text-xs md:text-sm ">
                {t("Read More")}{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelaxArea;
