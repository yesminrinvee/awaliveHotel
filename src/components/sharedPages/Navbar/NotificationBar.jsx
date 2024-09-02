import i18next, { t } from "i18next";
import avatar from "../../../../public/img/avatar.jpg";
import en from "../../../../public/img/en.png";
import ar from "../../../../public/img/sa.jpg";
import { notification } from "antd";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaRegCreditCard } from "react-icons/fa6";
import { LuCheckSquare } from "react-icons/lu";
// import ar from '\img\en.png';

const NotificationBar = () => {
  const currentLanguage = i18next.language;
  const { user, userRole, handleLogout } = useContext(AuthContext);
  const { t } = useTranslation("home");

  const changeLanguage = (languageCode) => {
    i18next.changeLanguage(languageCode);
    // notification["warning"]({
    //   message: "Language Changed",
    //   description: `Language has been changed to ${languageCode.toUpperCase()}.`,
    //   placement: "topRight",
    //   duration: 3.5,
    // });
    document.body.dir = languageCode === "ar" ? "rtl" : "ltr";
  };

  return (
    <section className={`  max-w-7xl mx-auto  ${currentLanguage === "ar" ? "body-ar font-semibold  " : "body-en font-semibold"}`}>
      <div className="hidden lg:flex justify-between  ">
        <div className="flex gap-6 text-[12px] tracking-widest py-3 items-center">
          {user && (
            <>
              <div className="flex gap-2 items-center justify-center">
                <FaRegCreditCard className="text-[16px]" />
                <p>{t("Payment options")}</p>
              </div>

              <div className="flex gap-2 items-center justify-center">
                <LuCheckSquare className="text-[16px]" />
                <p>{t("Terms Conditions")}</p>
              </div>
            </>
          )}
          <div className="flex gap-3">
            <p
              className="cursor-pointer"
              onClick={() => changeLanguage("en")}
              style={{ opacity: currentLanguage === "en" ? 0.5 : 1 }}
            >
              <a>EN</a>
              {/* <img src={en} alt="" className="" /> */}
            </p>
            <div
              className="cursor-pointer flex gap-1"
              onClick={() => changeLanguage("ar")}
              style={{ opacity: currentLanguage === "ar" ? 0.5 : 1 }}
            >
              {/* <img src={ar} alt="" className="" /> */}

              <p>AR</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 ">
          <div className="flex gap-6 text-[12px] tracking-widest py-3 items-center">
            {user && (
              <>
                <div>
                  <Link to={"/mybookings"}>{t("myBookings")}</Link>
                </div>

                <div>
                  <p className="capitalize">{t("Add your Review")} </p>
                </div>
              </>
            )}
          </div>
          {user?.fullName ? (
            <>
              <div to={"/login"} className="flex gap-2 bg-[#BE9874] py-3 px-4 cursor-pointer">
                <img src={avatar} alt="" className="w-8 " />
                <div className="text-white ">
                  <p className="text-[10px] tracking-[0.2rem] font-thin">{user?.fullName}</p>
                  <p className="text-[12px]  font-thin" onClick={handleLogout}>
                    LOG OUT
                  </p>
                </div>
              </div>
            </>
          ) : (
            <Link to={"/login"} className="flex gap-2 bg-[#BE9874] py-3 px-4 cursor-pointer ">
              <img src={avatar} alt="" className="w-8 " />
              <div className="text-white ">
                <p className="text-[10px] tracking-wider font-thin">{t("My Account")}</p>
                <p className="text-[12px]  font-thin">{t("LOG IN")}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotificationBar;
