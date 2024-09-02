import { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import img from "../../../assets/relaxArea.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
// import { Link } from 'react-router-dom';

const Loginpage = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("loginAndSignUp");
  const navigate = useNavigate();
  const { handleLogin, error, user, loading, setLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validateFields = () => {
    const newErrors = {
      email: email ? "" : t("emailRequired"),
      password: password ? "" : t("passwordRequired"),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleLoginClick = async () => {
    if (validateFields()) {
      await handleLogin(email, password);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      // If user is logged in
      navigate(from, { replace: true }); // Navigate to the 'from' route or default '/'
    }
  }, [user, navigate, from]);

  return (
    <section className="container mx-auto">
      <div
        className=  {`md:w-[90%]  md:h-[calc(100vh-78px)] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center px-4 md:px-10 py-10` }
        style={{ fontFamily: "Gilda Display, serif" }}
      >
        <div className="md:w-[80%]">
          <h1 className="text-3xl" style={{ fontFamily: "Gilda Display, serif" }}>{t("welcome")}</h1>
          <p className="text-xl py-5" style={{ fontFamily: "Gilda Display, serif" }}>{t("loginMessage")}</p>
          <div className="w-full flex flex-col gap-5 " id="guest-info-form" >
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`py-2 px-2 border bg-slate-50 ${errors.email && "border-red-500"}`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`py-2 px-2 border bg-slate-50 w-full ${errors.password && "border-red-500"}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${
                  currentLanguage === "ar" ? "left-0 pl-3" : "right-0 pr-3"
                } flex items-center text-sm leading-5`}
              >
                {showPassword ? t("hidePassword") : t("showPassword")}
              </button>
              {errors.password && <p className="text-red-500 text-xs ">{errors.password}</p>}
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}

            {loading ? (
              <Spin />
            ) : (
              <button
                type="button"
                id="confirm-button"
                className="uppercase bg-[#BE9874] text-xs text-white py-3"
                onClick={handleLoginClick}
              >
                Log In
              </button>
            )}
          </div>
          <p className="text-red-500 text-xs italic ">{t("forgetPassword")}</p>
        </div>
        <div className="md:w-[80%] flex flex-col gap-4">
          <h2 className="text-xl ">{t("joinMessage")}</h2>
          <img className="" src={img} alt="" />

          <li className="text-xs text-gray-400 ">{t("enjoyRates")}</li>
          <li className="text-xs text-gray-400">{t("freeWiFi")}</li>

          <Link to={"/signup"} className="w-full py-4  px-2 text-center  bg-[#BE9874] text-white  ">
            {t("joinNow")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Loginpage;
