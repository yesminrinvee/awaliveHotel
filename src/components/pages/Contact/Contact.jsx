import { useTranslation } from "react-i18next";
import PageAnimation from "../../PageAnimation/PageAnimation";
import keyImage from "/src/assets/icon-16.png";
import serImage from "/src/assets/icon-17.png";
import lagImage from "/src/assets/icon-15.png";
import waiImage from "/src/assets/icon-18.png";
import rvImage from "../../../assets/5.jpg";
import lnImage from "/src/assets/structure-2.jpg";
import spImage from "/src/assets/Structure.jpg";
import contactImage from "../../../assets/awaliveRoom.jpg";
import { useState } from "react";
import { Helmet } from "react-helmet";
import ContactBanner from "./ContactBanner";
import i18next from "i18next";
import axios from "axios";

// const initialFormData = {
//   email: "",
//   message: "",
// };

const Contact = () => {
  const currentLanguage = i18next.language
  const { t } = useTranslation("contact");
  const [formData, setFormData] = useState({
    email: '',
    message: ''
});
const [errors, setErrors] = useState({}); // New state for storing errors

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    // Clear errors for the current field
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
};

const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Email validation
    if (!formData.email) {
        errors.email = t("form_error_email_required");
        formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = t("form_error_email_invalid");
        formIsValid = false;
    }

    // Message validation
    if (!formData.message) {
        errors.message = t("form_error_message_required");
        formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
};


const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }

    // Implement Axios POST request here
    try {
        const response = await axios.post('https://server.awalivhotel.com/api/contact-message/create', formData);
        // const response = await axios.post('https://type-script-server.vercel.app/api/contact-message/create', formData);
        setFormData({ email: '', message: '' }); // Clear form on success
        alert(t("form_success_message")); // Show success message
    } catch (error) {
        console.error('There was an error!', error);
        alert(t("form_error_message")); // Show error message
    }
};

  const teamMembers = [
    {
      id: 1,
      name: "Emily Lewis",
      role: "Hotel Manager",
      email: "emily@hotel.com",
      avatar: "/src/assets/avetar.png",
    },
    // Add more team members as needed
  ];

  const backgroundImageStyle = {
    backgroundImage: `url(${contactImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  };

  return (
    <>
      <Helmet>
        <title>Contact Awalive Hotel - Reach Out for Exceptional Service in Taif</title>
        <meta
          name="description"
          content="Contact Awalive Hotel for inquiries, reservations, or any assistance you need. Our dedicated team is here to provide you with exceptional service in Taif."
        />
        <meta
          name="keywords"
          content="Contact Awalive Hotel, Taif hotel contact, hotel reservations, customer service, hotel inquiries"
        />
        <meta property="og:title" content="Contact Awalive Hotel - Reach Out for Exceptional Service in Taif" />
        <meta
          property="og:description"
          content="Need assistance with your booking or have a question about our services? Contact Awalive Hotel in Taif for prompt and friendly service."
        />
        <meta property="og:image" content="[Link to an image related to customer service or the hotel]" />
        <meta property="og:url" content="awalivehotel.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Awalive Hotel - Reach Out for Exceptional Service in Taif" />
        <meta
          name="twitter:description"
          content="Looking for top-tier hospitality? Contact Awalive Hotel in Taif for all your reservation needs and queries."
        />
        <meta name="twitter:image" content="[Link to a Twitter-appropriate image related to customer service or the hotel]" />
        {/* Other head elements like canonical link, viewport, language tag */}
      </Helmet>

      <PageAnimation>
        {/* <BannerPage text={t("contact_title")}  /> */}
        <ContactBanner />
        <section className={`max-w-7xl mx-auto py-10 md:py-16 px-2 ${currentLanguage === 'ar' ? 'body-ar font-semibold  ' : 'body-en-title '}`}>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col justify-center items-center gap-5">
              <img src={keyImage} alt="Key Service Icon" className="w-14 md:w-20" />
              <p className="text-xs text-center text-gray-500">{t("features.keyDescription")}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <img src={serImage} alt="Service Icon" className="w-14 md:w-20" />
              <p className="text-xs text-center text-gray-500">{t("features.serviceDescription")}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <img src={lagImage} alt="Luggage Icon" className="w-14 md:w-20" />
              <p className="text-xs text-center text-gray-500">{t("features.luggageDescription")}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <img src={waiImage} alt="Waiting Service Icon" className="w-14 md:w-20" />
              <p className="text-xs text-center text-gray-500">{t("features.waitersDescription")}</p>
            </div>
          </div>
        </section>

        <section className={`max-w-7xl mx-auto px-2 md:px-1 pb-20 ${currentLanguage === 'ar' ? 'body-ar font-semibold  ' : 'body-en '}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* First Column with two rows */}
            <div className="col-span-1 grid  grid-rows-2 gap-5">
              {/* First Row */}
              <div className="row-span-1 bg-[#BE9874] overflow-hidden relative  ">
                <div className="absolute top-0 left-0 w-full h-full bg-[#BE9874] opacity-95"></div>
                <img className="w-full h-full object-cover" src={rvImage} alt="" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-full px-4   ">
                  <h2 className="font-semibold tracking-widest text-center  pb-4">{t("Hotel Location")}</h2>
                  <div className="flex flex-col gap-3 text-center">
                    <p className="text-sm">
                      {" "}
                      
                      {t("Abu Baker As Siddiq Street")}
                    </p>
                    <p className="text-sm">
                      {" "}
                      
                      {t("Shobra, 99999* Taif, Saudi Arabia")}
                    </p>
                    <p className="text-sm">
                       02 1212 12321
                    </p>
                    <p className=":text-sm">
                    02 1212 12321
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="row-span-1 bg-[#1C1C1D] text-white flex flex-col justify-center items-center gap-4">
                <h2 className="font-semibold tracking-widest">{t("reception")}</h2>
                <div className="flex flex-col gap-3 items-center justify-center">
                <p className="text-sm">MON ...... 11:00 - 03:00 pm</p>
                <p className="text-sm">FRY ...... 11:00 - 03:00 pm</p>
                <p className="text-sm">SAT ...... 11:00 - 03:00 pm</p>
                <p className="text-sm">SUN ...... 11:00 - 03:00 pm</p>
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="relative col-span-1">
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
              <img src={lnImage} alt="" className="w-full h-full object-cover" />
              <div className="text-white flex flex-col gap-5 text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <h2 className={`text-4xl  md:text-5xl capitalize ${currentLanguage === 'ar' ? 'body-ar font-semibold  ' : 'body-en-title '}`}>{t("Lunch")}</h2>
                
                <a href="#" className="uppercase tracking-widest text-sm md:font-semibold">
                  {t("lunch_more_info")}
                </a>
              </div>
            </div>

            {/* Third Column */}
            <div className="relative col-span-1">
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
              <img src={spImage} alt="" className="w-full h-full object-cover" />
              <div className="text-white flex flex-col gap-5 text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
                <h2 className={`text-4xl md:text-5xl capitalize  ${currentLanguage === 'ar' ? 'body-ar font-semibold  ' : 'body-en-title '}`}>{t("Spa")}</h2>
                {/* <p className="text-xs ">{t("spa_description")}</p> */}
                <a href="#" className="uppercase tracking-widest text-sm md:font-semibold">
                  {t("spa_check_here")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={`relative ${currentLanguage === 'ar' ? 'body-ar font-semibold  ' : 'body-en '}`} style={backgroundImageStyle}>
          <div className=" absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="max-w-7xl mx-auto px-2 relative  ">
            <div className=" w-full flex flex-col md:flex-row items-center justify-center gap-5  py-16w md:py-20">
              <div className="md:w-[50%] text-center md:text-start text-white">
                <p className="text-sm uppercase tracking-[0.2rem]">{t("OUR TEAM")}</p>
                <h1 className={`text-3xl md:text-5xl tracking-widest py-8 ${currentLanguage === 'ar' ? 'body-ar font-semibold  ' : 'body-en-title '}`} >
                  {t("Meet Our Team")}
                </h1>
                <p className="text-xs  tracking-widest">{t("team_description")}</p>
                <div className="flex flex-col gap-5 pt-10">
                  <div className="flex flex-col text-center md:text-start md:flex-row items-center gap-5">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex flex-col md:flex-row items-center justify-center gap-3">
                        <img src={member.avatar} alt={member.name} className="w-20 md:w-12 rounded-full" />
                        <div>
                          <h2 className="text-sm tracking-widest">{member.name}</h2>
                          <p className="text-xs">{`${member.role} : ${member.email}`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:w-[50%] text-center bg-white px-10 py-10 ">
            <h2 className={`text-3xl py-3 tracking-widest capitalize font-semibold text-black ${currentLanguage === 'ar' ? 'body-ar font-semibold  ' : 'body-en-title '} `}>{t("contact_title")}</h2>
            <p className="px-4 text-gray-400 text-xs">{t("contact_description")}</p>

            <form className="w-[95%] mx-auto flex flex-col gap-5 py-10" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("form_email_placeholder")}
                    className={`py-2 px-2 border ${errors.email ? 'border-red-500' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                <textarea
                    name="message"
                    id="message"
                    cols="10"
                    rows="3"
                    placeholder={t("form_message_placeholder")}
                    className={`py-2 px-2 border ${errors.message ? 'border-red-500' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}

                <button type="submit" className="py-3 px-5 bg-[#BE9874] text-white">
                    {t("form_submit_button")}
                </button>
            </form>
        </div>
            </div>
          </div>
        </section>
      </PageAnimation>
    </>
  );
};

export default Contact;
