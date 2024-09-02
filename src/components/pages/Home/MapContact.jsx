import { useTranslation } from "react-i18next";
import MapImage from "../../../assets/google map.png";
import i18next from "i18next";
import phone from '../../../../public/img/icon-20.png'
import email from '../../../../public/img/icon-19.png'
// import email from 'img/icon-19.png'

const MapContact = () => {
  const { t } = useTranslation("footer");
  const currentLanguage = i18next.language
  const googleMapsUrl = "https://maps.app.goo.gl/d1FkZCNpjUtvkY4t6";

  // const formattedPhoneNumber = (+966127375555).toLocaleString('ar-AE');
  // const formattedSecondPhoneNumber = (+966547375550).toLocaleString('ar-AE');

  return (
    <section className="">
      <div className={`flex flex-col md:flex-row text-white ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`}>
        <div className="w-full md:w-[50%]">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-black">
            <img src={MapImage} alt="awalive-map-image" />
          </a>
        </div>
        <div className="bg-[#1C1C1C] w-full md:w-[25%] py-6 px-8 flex flex-col gap-6  justify-center text-center md:text-start">
          <img src={phone} alt="phon-icon" className="w-16" />
          <h2 className="text-xl md:text-3xl " >
            {t("contact.contactUs")}
          </h2>
          <div className="text-sm">
            <div>

            <p>{t("contact.reservation")} :</p>
            <p dir="ltr" className={`text-xl font-semibold ${currentLanguage === 'ar' ? 'text-end ' : 'text-start '}`} >{t("contact.phone")}</p>
            </div>
          </div>
          
        </div>
        <div className="bg-[#BE9874] w-full md:w-[25%] py-6 px-8 flex flex-col gap-6  justify-center items-center md:items-start text-center md:text-start">
        <img src={email} alt="phon-icon" className="w-16 " />
          <h2 className="text-xl md:text-3xl" >
            {t("contact.dropALine")}
          </h2>
          <div className="text-sm">
            <p>{t("contact.reservation")} :</p>
            <p dir="ltr" className="text-xl font-semibold">{t("contact.AltPhone")}</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default MapContact;
