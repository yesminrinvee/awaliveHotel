import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import sliderOne from "../../../../public/img/staff1.jpg";
import sliderTwo from "../../../../public/img/staff2.jpg";
import sliderThree from "../../../../public/img/staff-3.jpg";
import i18next from "i18next";
import { useTranslation } from "react-i18next";


const StaffSlider = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("about");
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const slides = [
    { img: sliderOne, name: t("Mary Pepper"), role: t("Waitress"), Message: t("restaurantDescription") },
    { img: sliderTwo, name: t("Emily Stuart"), role: t("chef"), Message: t("restaurantDescription")},
    { img: sliderThree, name: t("Mary Stuart"), role: t("Waitress"), Message: t("restaurantDescription") },
];

  // Settings for your main slider
  const settingsMain = {
    rtl: currentLanguage === 'ar',
    asNavFor: nav2,
    ref: slider => (sliderRef1.current = slider),
    afterChange: index => setCurrentSlide(index),
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true, // Enable autoplay
  // autoplaySpeed: 3000,
    // fade: true, // Use fade for smooth transition
    pauseOnHover: false
    
    
  };

  // Settings for your navigation slider
  const settingsNav = {
    rtl: currentLanguage === 'ar',
    asNavFor: nav1,
    ref: slider => (sliderRef2.current = slider),
    slidesToShow: 3, // Show 3 thumbnails at a time
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true, // Enable center mode for the thumbnails
    infinite: true,
 
    
  };

  return (
    
      <div className={` slider-container h-[calc(100vh-120px)] relative w-full overflow-hidden`} >
  
  <Slider {...settingsMain} className={`h-full w-full overflow-hidden ${currentLanguage === 'ar' ? 'body-ar  font-medium text-end ' : 'body-en  text-start'}`}>
    {slides.map((slide, index) => (
        <div key={index} className={` w-full relative bg-red-100 h-[calc(100vh-120px)] cursor-grab `}>
            <img className="w-full h-full object-cover" src={slide.img} alt={`Slide ${index + 1}`} />
            <div className={`absolute inset-0  ${currentLanguage === 'ar' ? "bg-gradient-to-l": "bg-gradient-to-r"}   from-black bg-opacity-60`}></div> {/* Black overlay */}
            <div className={`absolute inset-0 flex flex-col justify-center  transition-opacity duration-500 w-[90%] md:w-[40%] mx-auto  gap-7 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                <p className={`text-white  text-5xl capitalize tracking-widest ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`} >{slide.name}</p>
                <p className="text-white  text-xs uppercase tracking-widest ">{slide.role}</p>
                <p className="text-white text-sm capitalize tracking-widest">{slide.Message}</p>
                
            </div>
        </div>
    ))}
</Slider>
  
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full md:w-96 h-24">
              <Slider {...settingsNav} className="w-full h-full cursor-pointer">
                  <div className="w-full h-full"><img className="w-full h-full object-cover" src={sliderOne} alt="Thumbnail 1" /></div>
                  <div className="w-full h-full"><img className="w-full h-full object-cover" src={sliderTwo} alt="Thumbnail 2" /></div>
                  <div className="w-full h-full"><img className="w-full h-full object-cover" src={sliderThree} alt="Thumbnail 3" /></div>
              </Slider>
          </div>
      </div>

  
  );
};

export default StaffSlider;
