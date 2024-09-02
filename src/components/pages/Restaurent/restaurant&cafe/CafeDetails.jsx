


import line from "../../../../../public/img/line.jpg";
import res1 from "../../../../../public/img/res1.jpg";
import res3 from "../../../../../public/img/res3.jpg";
import res4 from "../../../../../public/img/res4.jpg";

import { CiWifiOn, CiRouter, CiUser, CiBank } from "react-icons/ci";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const CafeDetails = () => {
    const currentLanguage = i18next.language
    const {t} = useTranslation('fb')


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
            <img className="w-full h-full object-cover" src={res1} alt="" />
           
          </div>
        </div>
      
      </section>


      <section className="max-w-7xl mx-auto pb-20">
         <div className=" ">
            <img className="" src={line} alt="" />
          </div>
    </section>


      <section className="max-w-7xl mx-auto pb-20">
        <div className="md:h-[500px] flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 gap-8">
          

          <div className="w-full md:1/2 lg:w-2/3 relative ">
            <img className="w-full h-full object-cover" src={res3} alt="" />
            
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

 <section className="max-w-7xl mx-auto pb-20">
         <div className=" ">
            <img className="" src={line} alt="" />
          </div>
    </section>

    <section className="max-w-7xl mx-auto pb-20">
        <div className=" md:h-[500px] flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 gap-8">
          <div className={`w-full md:w-1/2 lg:1/3 space-y-4 text-black text-center md:text-start ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en-title'} `}>
            <p className="text-xs uppercase tracking-widest text-gray-500">{t("cafe")}</p>
            <h2 className="text-4xl lg:text-6xl ">{t("cafe1")}</h2>
            <h2 className="text-4xl lg:text-6xl ">{t("cafe2")} </h2>
            <p className={`text-sm text-gray-600 ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en'}`}>
              {t("cafeD")}
            </p>
            
          </div>

          <div className="w-full md:1/2 lg:w-2/3 relative ">
            <img className="w-full h-full object-cover" src={res4} alt="" />
           
          </div>
        </div>
      
      </section>


    </>
  );
};

export default CafeDetails;
