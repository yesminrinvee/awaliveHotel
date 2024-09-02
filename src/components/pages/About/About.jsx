// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import PageAnimation from "../../PageAnimation/PageAnimation";
import BestPrice from "./BestPrice";
// import Slider from "./Slider";
import breadCums from '../../../assets/5.jpg'
import StaffSlider from "./StaffSlider";
import HotelStucture from "./HotelStucture";
// import { LanguageContext } from "../../sharedPages/Context/LanguageProvider";
// import i18next from "i18next";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Awalive Hotel - Discover Our World-Class Services in Taif</title>
        <meta
          name="description"
          content="Learn about Awalive Hotel's commitment to excellence in hospitality. Discover our world-class services, luxurious amenities, and unique experiences in Taif."
        />
        <meta
          name="keywords"
          content="About Awalive Hotel, luxury hotel in Taif, hotel services, hotel amenities, luxury accommodation"
        />
        <meta property="og:title" content="About Awalive Hotel - Discover Our World-Class Services in Taif" />
        <meta
          property="og:description"
          content="Explore the essence of luxury and comfort at Awalive Hotel. Get to know our sophisticated services, elegant rooms, and exclusive amenities in Taif."
        />
        <meta property="og:image" content={breadCums} />
        <meta property="og:url" content="awalivehotel.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Awalive Hotel - Discover Our World-Class Services in Taif" />
        <meta
          name="twitter:description"
          content="Dive into the world of Awalive Hotel and explore our luxurious services and amenities in Taif. Learn what makes us stand out."
        />
        <meta name="twitter:image" content="[Link to an image showcasing your hotel's unique features]" />
        {/* Other head elements like canonical link, viewport, language tag */}
      </Helmet>
      <PageAnimation>
        <>
          {/* <Slider /> */}
          <HotelStucture/>

        </>
        {/* ) */}
      </PageAnimation>
    </>
  );
};

export default About;
