
import img from "../../../../public/img/staff-3.jpg";
import event from "../../../../public/img/ban5.jpg";
import meeting from "../../../../public/img/ban3.jpg";
import { CiWifiOn, CiRouter, CiUser, CiBank } from "react-icons/ci";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const BanquetDetails = () => {
    const currentLanguage = i18next.language
    const {t} = useTranslation('banquet')


  return (
    <>
      <section className=" max-w-5xl mx-auto ">
        <div className="py-10 md:py-20 flex flex-col  items-center gap-10">
          <p className={`text-4xl lg:text-6xl text-gray-800 text-center ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en-title'}`} >{t("What's Includes")}</p>
          
        </div>
      </section>
      <section className="max-w-7xl mx-auto pb-20">
        <div className=" md:h-[500px] flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 gap-8">
          <div className={`w-full md:w-1/2 lg:1/3 space-y-4 text-black text-center md:text-start ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en-title'} `}>
            <p className="text-xs uppercase tracking-widest text-gray-500">{t("EXECUTIVE MEETINGS")}</p>
            <h2 className="text-4xl lg:text-6xl ">{t("Our Goal is a")}</h2>
            <h2 className="text-4xl lg:text-6xl ">{t("Elegant Banquets")} </h2>
            <p className={`text-sm text-gray-600 ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en'}`}>
              {t("details")}
            </p>
            
          </div>

          <div className="w-full md:1/2 lg:w-2/3 relative ">
            <img className="w-full h-full object-cover" src={meeting} alt="" />
            <div  className="hidden md:flex justify-center md:absolute left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-[#BE9874] p-4 w-[80%] text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-lg font-bold">4</p>
                  <p className="text-xs uppercase ">{t("MEETING HALLS")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">2</p>
                  <p className="text-xs uppercase ">{t("BANQUET HALLS")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">*</p>
                  <p className="text-xs uppercase ">{t("OUTSIDE CATERING")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">1</p>
                  <p className="text-xs uppercase ">{t("VISUAL THEATER")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  className="md:hidden flex items-center justify-center p-4 mt-15  w-[80%] mx-auto bg-[#BE9874] text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                <p className="text-lg font-bold">4</p>
                  <p className="text-xs uppercase ">{t("MEETING HALLS")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">2</p>
                  <p className="text-xs uppercase ">{t("BANQUET HALLS")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">*</p>
                  <p className="text-xs uppercase ">{t("OUTSIDE CATERING")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">1</p>
                  <p className="text-xs uppercase ">{t("VISUAL THEATER")}</p>
                </div>
              </div>
            </div>
      </section>
      <section className="max-w-7xl mx-auto pb-20">
        <div className="md:h-[500px] flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 gap-8">
          

          <div className="w-full md:1/2 lg:w-2/3 relative ">
            <img className="w-full h-full object-cover" src={event} alt="" />
            
          </div>

          <div className={`w-full md:w-1/2 lg:1/3 space-y-4 text-black ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en-title'} `}>
            <p className="text-xs uppercase tracking-widest text-gray-500">{t("halls")}</p>
            <h2 className="text-4xl lg:text-6xl ">{t("halls1")} </h2>
            <h2 className="text-4xl lg:text-6xl ">{t("halls2")} </h2>
            <p className="text-sm text-gray-600">
            {t("hallsD")}
            </p>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default BanquetDetails;
