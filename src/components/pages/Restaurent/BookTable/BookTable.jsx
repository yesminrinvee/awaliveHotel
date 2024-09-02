import PageAnimation from "../../../PageAnimation/PageAnimation";
import BannerPage from "../../../sharedPages/PageBanner/BannerPage";
import TableDateAndTime from "./TableDateAndTime";
import img from "../../../../assets/restuarent.jpg";
import PromotionRooms from "./PromotionRooms";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import RestaurantBanner from "./RestaurantBanner";

const BookTable = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("restaurant");

  const localizeNumber = (number) => {
    return number.toLocaleString(currentLanguage === "ar" ? "ar-EG" : "en-US");
  };

  return (
    // <PageAnimation>
    <>
  
      <RestaurantBanner text={t("Book A Table")} />
      
      <TableDateAndTime />
      <section
        className="relative"
        style={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          fontFamily: "Gilda Display, serif",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-transparent"></div>
        <div className="max-w-7xl mx-auto py-20 relative px-1">
          <div className="grid grid-cols-1 md:grid-cols-4  gap-5 md:gap-0 text-white w-[90%] mx-auto md:w-full">
            <div className="flex gap-5 md:items-center md:justify-center">
              <h2 className="text-4xl">{localizeNumber(189)}</h2>
              <div>
                <p className="text-xl ">{t("rooms.label")}</p>
                <p className="text-xs">Experience Elegance and Comfort</p>
              </div>
            </div>
            <div className="flex gap-5 md:items-center md:justify-center">
              <h2 className="text-4xl">{localizeNumber(40)}</h2>
              <div>
                <p className="text-xl ">{t("suites.label")}</p>
                <p className="text-xs"> Luxurious Suites</p>
              </div>
            </div>
            <div className="flex gap-5 md:items-center md:justify-center">
              <h2 className="text-4xl">{localizeNumber(24)}</h2>
              <div>
                <p className="text-xl">{t("h24.label")}</p>
                <p className="text-xs">24/7 Service</p>
              </div>
            </div>
            <div className="flex gap-5 md:items-center md:justify-center">
              <h2 className="text-4xl">{localizeNumber(2)}</h2>
              <div>
                <p className="text-xl">{t("restaurant.label")}</p>
                <p className="text-xs">Exquisite Restaurants Await You</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PromotionRooms />
      {/* </PageAnimation>  */}
    </>
  );
};

export default BookTable;
