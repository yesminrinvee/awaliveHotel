import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BestPromotions = ({ data, loading, promotionError }) => {
  const currentLanguage = i18next.language
  const {t} = useTranslation("promotion")

  

  return (
    <section className="max-w-7xl mx-auto" >
        <div className=" py-20">
      <div className={` text-center pb-16  flex flex-col  gap-4 text-black ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en-title '} `}>
        <p className="tracking-[0.2rem] text-sm">{t("MONTHLY SALE")}</p>
        <h2 className="text-3xl md:text-6xl">{t("Best Promo of the Day")}</h2>
      </div>
      {loading ? (
        <div>Loading</div>
      ) : promotionError? (
        <div className="text-center font-semibold">{promotionError}</div>
      ) : (
        <div className=" max-w-6xl mx-auto grid md:grid-cols-3 gap-7">
          {data.slice(0, 6).map((room) => (
            <Link to={`/room/${room._id}`} key={room._id} className="shadow-lg ">
              <div className="relative">
              <img src={room.images[0]} alt="" className="h-full md:h-[350px] w-full object-cover " />
              <div className=" absolute inset-0 bg-black opacity-30"></div>
              <p className="absolute top-5 left-5 text-white bg-[#D34949] text-xs tracking-widest px-5 ">{`- ${room?.discount} %`}</p>

              </div>
              <div className="text-center flex flex-col justify-center items-center gap-4 py-10">
                <h3 className={`text-2xl md:text-2xl ${currentLanguage === 'ar' ? 'body-ar  font-medium  ' : 'body-en-title font-semibold'}  `}>{room.title}</h3>
                <div className=" flex gap-2 items-center">
                <s className="text-lg font-thin text-gray-300">{room?.priceHistory} SR</s>
                <p className="text-lg font-thin">{room.priceOptions[0].price} SR</p>
                </div>
                <div>
                  <button className="py-2 px-4 uppercase text-sm bg-[#1C1C1D] text-white tracking-widest ">
                    {t("Read More")}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) }
      </div>
    </section>
  );
};

export default BestPromotions;
