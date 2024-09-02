import React from "react";
import contactImg from '../../../assets/recaption.jpg'
import ActionSteps from "../../pages/SearchRoooms/ActionSteps";
import i18next from "i18next";

const BannerPage = ({ text }) => {
  const currentLanguage = i18next.language
  const containerStyle = {
    backgroundImage: `url(${contactImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  };

  return (
    <section className="relative h-[400px] " style={containerStyle}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div
        className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ fontFamily: "Gilda Display, serif" }}
      >
        <h2 className={`text-center text-4xl md:text-7xl  capitalize text-white ${currentLanguage === 'ar' ? 'body-ar font-semibold  ' : 'body-en-title '} `}>{text}</h2>
      </div>
      <div className="absolute bottom-4   left-1/2 -translate-y-1/2 -translate-x-1/2 z-30">

      <ActionSteps />
      </div>
    </section>
  );
};

export default BannerPage;
