import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import banquet1 from '../../../../public/img/3_elev_pwd.jpg'
import banquet2 from '../../../../public/img/6_room_e_pwd.jpg'
import banquet3 from '../../../../public/img/4_room_m_pwd.jpg'
import placeholderImage from '../../../../public/img/awalive-Blaack.png'

import i18next from 'i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const BanquetBanner = () => {
    const currentLanguage = i18next.language;
    const { t } = useTranslation("about");
    
    const [currentSlide, setCurrentSlide] = useState(0);
  
    
  
    const slides = [
      { img: banquet1  },
      { img: banquet2 },
      { img: banquet3 },
  ];
  
    // Settings for your main slider
    const settingsMain = {
      rtl: currentLanguage === 'ar',
      // asNavFor: nav2,
      // ref: slider => (sliderRef1.current = slider),
      afterChange: index => setCurrentSlide(index),
    //   slidesToShow: 1,
    //   swipeToSlide: true,
    //   arrows: false,
    //   autoplay: true, // Enable autoplay
    // // autoplaySpeed: 3000,
    //   // fade: true, // Use fade for smooth transition
    //   pauseOnHover: false
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true, 
    infinite: slides.length > 1,
    speed: 2000,
    slidesToScroll: 1,
    // autoplay: slides.length > 1,
    autoplaySpeed: 7000,
    // fade: true, 
    pauseOnHover: false,
      
    };
  
    
  
    return (
      
        <div className={` slider-container h-full md:h-[calc(100vh-120px)] relative w-full overflow-hidden`} >
    
    <Slider {...settingsMain} className={`h-full w-full overflow-hidden ${currentLanguage === 'ar' ? 'body-ar  font-medium text-end ' : 'body-en  text-start'}`}>
      {slides.map((slide, index) => (
          <div key={index} className={` w-full relative bg-red-100 h-96 md:h-[calc(100vh-120px)] cursor-grab `}>
              {/* <img className="w-full h-full object-cover" src={slide.img} alt={`Slide ${index + 1}`} /> */}
              {/* <picture> */}
                {/* <source srcSet={slide.img} type={slide.img}  /> */}
                <img src={slide.img}   alt="Descriptive text for the image" className='object-cover h-full  w-full' />
              {/* </picture> */}
              
             
              <div className={`absolute inset-0 flex flex-col justify-center  transition-opacity duration-500 w-[90%] md:w-[40%] mx-auto  gap-7 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                  <p className={`text-white  text-5xl capitalize tracking-widest ${currentLanguage === 'ar' ? 'body-ar  font-medium ' : 'body-en-title '}`} >{slide.name}</p>
                  <p className="text-white  text-xs uppercase tracking-widest ">{slide.role}</p>
                  <p className="text-white text-sm capitalize tracking-widest">{slide.Message}</p>
                  
              </div>
          </div>
      ))}
  </Slider>
    
            
        </div>
  
    
    );
  };
  

export default BanquetBanner