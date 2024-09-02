import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import r1 from "../../../../../public/img/res1.jpg";
import r2 from "../../../../../public/img/res2.jpg";
import r3 from "../../../../../public/img/res3.jpg";
import r4 from "../../../../../public/img/res4.jpg";

import i18next from "i18next";

const CafeBanner = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("about");
  // const [nav1, setNav1] = useState(null);
  // const [nav2, setNav2] = useState(null);
  // const sliderRef1 = useRef(null);
  // const sliderRef2 = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect(() => {
  //   setNav1(sliderRef1.current);
  //   setNav2(sliderRef2.current);
  // }, []);

  const slides = [
    { img: r1 },
    { img: r2 },
    { img: r3 },
    { img: r4 },
  
    
  ];

  // Settings for your main slider
  const settingsMain = {
    rtl: currentLanguage === "ar",
    // asNavFor: nav2,
    // ref: slider => (sliderRef1.current = slider),
    afterChange: (index) => setCurrentSlide(index),
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true, // Enable autoplay
    infinite: slides.length > 1,
    speed: 2000,
    slidesToScroll: 1,
    // autoplay: slides.length > 1,
    autoplaySpeed: 7000,
    // fade: true, // Use fade for smooth transition
    pauseOnHover: false,
  };

  return (
    <div className={` slider-container h-full md:h-[calc(100vh-120px)] relative w-full overflow-hidden`}>
      <Slider
        {...settingsMain}
        className={`h-full w-full overflow-hidden ${currentLanguage === "ar" ? "body-ar  font-medium text-end " : "body-en  text-start"}`}
      >
        {slides.map((slide, index) => (
          <div key={index} className={` w-full relative bg-red-100 h-full md:h-[calc(100vh-120px)] cursor-grab `}>
            {/* <img className="w-full h-full object-cover" src={slide.img} alt={`Slide ${index + 1}`} /> */}
            <picture>
              <source srcSet={slide.img} type={slide.img} />

              <img src={slide.img} alt="Descriptive text for the image" className="object-cover h-full  w-full" />
            </picture>

            {/* <div className={`absolute inset-0 flex flex-col justify-center  transition-opacity duration-500 w-[90%] md:w-[40%] mx-auto  gap-7 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                  <p className={`text-white  text-5xl capitalize tracking-widest ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`} >{slide.name}</p>
                  <p className="text-white  text-xs uppercase tracking-widest ">{slide.role}</p>
                  <p className="text-white text-sm capitalize tracking-widest">{slide.Message}</p>
                  
              </div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CafeBanner;
