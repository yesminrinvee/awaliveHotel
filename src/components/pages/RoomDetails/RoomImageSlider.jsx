/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Slider from "react-slick";

import i18next from "i18next";


const RoomImageSlider = ({ images }) => {
  const [languageKey, setLanguageKey] = useState(i18next.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLanguageKey(lng);
    };

    i18next.on("languageChanged", handleLanguageChange);

    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, [setLanguageKey]);

  const settings = {
    // dots: true,
    // fade: true,
    // infinite: true,
    infinite: images.length > 1,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,        // Enable autoplay
    autoplay: images.length > 1,
  autoplaySpeed: 3000,   // Set delay between transitions to 3000 milliseconds (3 seconds)
  waitForAnimate: false
  };

  return (
    <div className="">
      
      <div className="slider-container w-full" dir={!languageKey ? "rtl" : "ltr"}>
      <Slider   {...settings} className="w-full overflow-hidden">
        {images?.map((img, ind) =>(
          <div key={ind}>
          <img src={img} className="w-full aspect-video object-fill object-center cursor-grab"  />
        </div>
        ) )}
        
      </Slider>
    </div>
    </div>
  );
};

export default RoomImageSlider;
