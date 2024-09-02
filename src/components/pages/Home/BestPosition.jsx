import awaliveRoom from "../../../assets/awaliveRoom.jpg";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const BestPosition = () => {
  const { t } = useTranslation("home");
  const currentLanguage = i18next.language;

  return (
    <section
    className=""
      style={{
        backgroundImage: `url(${awaliveRoom})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
    
      <div className={` bg-black bg-opacity-20   md:py-15 xl:py-28 ${currentLanguage === "ar" ? "body-ar  font-medium " : "body-en "}`}>
        <div className="max-w-6xl mx-auto  text-white">
          <div className="md:w-[50%] flex flex-col gap-5 md:gap-8 px-5 text-center md:text-start ">
            <p className="text-sm   tracking-widest pt-7">{t("exploreCity")}</p>
            <h2 className={`text-4xl md:text-6xl ${currentLanguage === "ar" ? "body-ar  font-medium " : "body-en-title "}`}>
              {t("primeLocationTitle")}
            </h2>
            <p className="text-sm text-white py-6">{t("primeLocationDescription")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestPosition;
