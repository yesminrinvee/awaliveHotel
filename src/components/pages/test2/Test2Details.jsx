
import img from "../../../../public/img/staff-3.jpg";
import event from "../../../../public/img/event.jpg";
import meeting from "../../../../public/img/meeting.jpg";
import { CiWifiOn, CiRouter, CiUser, CiBank } from "react-icons/ci";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Test2Details = () => {
    const currentLanguage = i18next.language
    const {t} = useTranslation('test2')


  return (
    <>
      <section className=" max-w-5xl mx-auto ">
        <div className="py-10 md:py-20 flex flex-col  items-center gap-10">
          <p className={`text-4xl lg:text-6xl text-gray-800 text-center ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en-title'}`} >{t("What's Includes")}</p>
          <div className="flex flex-wrap gap-4 p-4">
            <div className="flex flex-col  gap-2 border py-2 px-8 w-40 ">
              <CiWifiOn className="h-6 w-6" />
              <div>
                <p className="font-semibold text-gray-800">{t("Free WiFi")}</p>
                <p className="text-sm text-gray-600">{t("WiFi")}</p>
              </div>
            </div>

            <div className="flex flex-col  gap-2 border py-2 px-8 w-40 ">
              <CiRouter className="h-6 w-6" />
              <div>
                <p className="font-semibold text-gray-800">{t("Projector")}</p>
                <p className="text-sm text-gray-600">{t("Projector")}</p>
              </div>
            </div>
            <div className="flex flex-col  gap-2 border py-2 px-8 w-40">
              <CiBank className="h-6 w-6" />
              <div>
                <p className="font-semibold text-gray-800">{t("Size")}</p>
                <p className="text-sm text-gray-600">1200 SQ ft</p>
              </div>
            </div>
            <div className="flex flex-col  gap-2 border py-2 px-5 w-40">
              <CiUser className="h-6 w-6" />
              <div>
                <p className="font-semibold text-gray-800">{t("Capacity")}</p>
                <p className="text-sm text-gray-600">{t("Upto 1000 Guests")}</p>
              </div>
            </div>
          </div>
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
            <button className={`bg-black text-sm text-white py-2 px-4 uppercase ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en'}`}>{t("VIEW INFO")}</button>
          </div>

          <div className="w-full md:1/2 lg:w-2/3 relative ">
            <img className="w-full h-full object-cover" src={meeting} alt="Room Cleaning" />
            <div  className="hidden md:flex justify-center md:absolute left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-[#BE9874] p-4 w-[80%] text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-lg font-bold">2+</p>
                  <p className="text-xs uppercase ">{t("MEETING HALL")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">2*</p>
                  <p className="text-xs uppercase ">{t("RESTAURANT")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">300+</p>
                  <p className="text-xs uppercase ">{t("ROOMS")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">1*1</p>
                  <p className="text-xs uppercase ">{t("SPA & GYM")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  className="md:hidden flex items-center justify-center p-4 mt-15  w-[80%] mx-auto bg-[#BE9874] text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-lg font-bold">2+</p>
                  <p className="text-xs uppercase ">{t("MEETING HALL")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">2*</p>
                  <p className="text-xs uppercase ">{t("RESTAURANT")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">300+</p>
                  <p className="text-xs uppercase ">{t("ROOMS")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">1*1</p>
                  <p className="text-xs uppercase ">{t("SPA & GYM")}</p>
                </div>
              </div>
            </div>
      </section>
      <section className="max-w-7xl mx-auto pb-20">
        <div className="md:h-[500px] flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 gap-8">
          

          <div className="w-full md:1/2 lg:w-2/3 relative ">
            <img className="w-full h-full object-cover" src={event} alt="Room Cleaning" />
            
          </div>

          <div className={`w-full md:w-1/2 lg:1/3 space-y-4 text-black ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en-title'} `}>
            <p className="text-xs uppercase tracking-widest text-gray-500">{t("Daily Cleaning")}</p>
            <h2 className="text-4xl lg:text-6xl ">{t("Our Goal is a")} </h2>
            <h2 className="text-4xl lg:text-6xl ">{t("Good Stay")} </h2>
            <p className="text-sm text-gray-600">
            {t("details")}
            </p>
            <button className={`bg-black text-sm text-white py-2 px-4 uppercase ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en'}`}>{t("VIEW INFO")}</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Test2Details;
