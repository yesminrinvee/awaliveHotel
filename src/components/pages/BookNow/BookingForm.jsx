import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
import { useTranslation } from "react-i18next";
import i18next, { use } from "i18next";

const BookingForm = () => {
  const currentLanguage = i18next.language;
  const authInfo = useContext(AuthContext);
  const { user, setLoading } = authInfo;
  const navigate = useNavigate();
  const [guestData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    message: "",
    arrivalTime: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const { t } = useTranslation("booking");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...guestData,
      [name]: value,
    });
  };

  const handleSubmitButtonClick = () => {
    const errors = {};

    // Basic validation for required fields
    Object.keys(guestData).forEach((key) => {
      if (
        key !== "address" &&
        key !== "city" &&
        key !== "message" &&
        key !== "arrivalTime" &&
        (!guestData[key] || guestData[key].trim() === "")
      ) {
        errors[key] = t("requiredField");
      }
    });

    setFormErrors(errors);

    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      // Retrieve existing bookingInfo from localStorage
      const existingBookingInfo = JSON.parse(localStorage.getItem("bookingInfo")) || {};

      // Update the existing bookingInfo with form data
      const updatedBookingInfo = {
        ...existingBookingInfo,
        guestData,
      };

      // Save the updated bookingInfo back to localStorage
      localStorage.setItem("bookingInfo", JSON.stringify(updatedBookingInfo));

      navigate("/BookingConfirm");
      setLoading(true);
    }
  };

  return (
    <div className={`md:w-2/3 ${
      currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"
    }`} >
      <div>
        {!user && (
          <p
            className={`text-xs  bg-[#BE9874] mb-8 py-3 text-white px-2 tracking-wider ${
              currentLanguage === "ar" ? "body-ar font-medium" : "body-en"
            }`}
          >
            {t("You are booking as guest, LOGIN or REGISTER if you want to save your reservation on your account")}
          </p>
        )}
        <p className={`text-xl  md:text-3xl pb-8  ${currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"}`}>
          {t("addYourInformationsKey")}:
        </p>
        <div className="pb-6">
          <form className="flex flex-col gap-5">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label htmlFor="firstName">{t("Name")} *</label>
                  {formErrors.firstName && <p className="text-white bg-[#BE9874] text-xs px-2  py-2">{formErrors.firstName}</p>}
                </div>
                <input
                  type="text"
                  name="firstName"
                  
                  value={guestData.firstName}
                  onChange={handleInputChange}
                  required
                  className={`py-2 px-2 border bg-indigo-50 ${formErrors.firstName && "border-red-500"}`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label htmlFor="lastName">{t("Surname")} *</label>
                  {formErrors.lastName && <p className="text-white bg-[#BE9874] text-xs px-2  py-2">{formErrors.lastName}</p>}
                </div>
                <input
                  type="text"
                  name="lastName"
                
                  value={guestData.lastName}
                  onChange={handleInputChange}
                  required
                  className={`py-2 px-2 border bg-indigo-50 ${formErrors.lastName && "border-red-500"}`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label htmlFor="email">{t("Email")} *</label>
                  {formErrors.email && <p className="text-white bg-[#BE9874] text-xs px-2  py-2">{formErrors.email}</p>}
                </div>
                <input
                  type="email"
                  name="email"
                 placeholder={user? use.email : ""}
                  value={guestData.email}
                  onChange={handleInputChange}
                  required
                  className={`py-2 px-2 border bg-indigo-50 ${formErrors.email && "border-red-500"}`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label htmlFor="phone">{t("Phone")} *</label>
                  {formErrors.phone && <p className="text-white bg-[#BE9874] text-xs px-2  py-2">{formErrors.phone}</p>}
                </div>
                <input
                  type="tel"
                  name="phone"
                  
                  value={guestData.phone}
                  onChange={handleInputChange}
                  required
                  className={`py-2 px-2 border bg-indigo-50 ${formErrors.phone && "border-red-500"}`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="address">{t("Address")} </label>
                <input
                  type="text"
                  name="address"
                 
                  value={guestData.address}
                  onChange={handleInputChange}
                  className={`py-2 px-2 border bg-indigo-50 ${formErrors.address && "border-red-500"}`}
                />
                {formErrors.address && <p className="text-red-500">{formErrors.address}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="city">{t("City")} </label>
                <input
                  type="text"
                  name="city"
                 
                  value={guestData.city}
                  onChange={handleInputChange}
                  className={`py-2 px-2 border bg-indigo-50 ${formErrors.city && "border-red-500"}`}
                />
                {formErrors.city && <p className="text-red-500">{formErrors.city}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-1">
              <label htmlFor="message">{t("Message")} </label>
              <textarea
                type="text"
                name="message"
                cols={30}
                rows={5}
               
                value={guestData.message}
                onChange={handleInputChange}
                className={`py-2 px-2 border bg-indigo-50 ${formErrors.message && "border-red-500"}`}
              />
              {formErrors.message && <p className="text-red-500">{formErrors.message}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="time">{t("arrival")}</label>
                <input
                  type="time"
                  id="time"
                  name="arrivalTime"
                  
                  value={guestData.arrivalTime}
                  onChange={handleInputChange}
                  className={`py-2 px-2 border bg-indigo-50 ${formErrors.arrivalTime && "border-red-500"}`}
                />
                {formErrors.arrivalTime && <p className="text-red-500">{formErrors.arrivalTime}</p>}
              </div>
            </div>

            {/* Add similar lines for other fields */}

            {/* Add other form fields here */}

            <div>
              <button type="button " onClick={handleSubmitButtonClick} className="bg-[#BE9874] py-2 px-8 text-sm text-white uppercase">
                {t("CHECKOUT")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

// const BookingForm = () => {
//   return (
//     <div className="md:w-2/3" style={{ fontFamily: "Gilda Display, serif" }}>
//           <div>
//             <p className="text-xl md:text-2xl pb-3">Add Your Informations :</p>
//             <div>
//               <form className="flex flex-col gap-5">
//                 <div className="grid md:grid-cols-2 gap-5">
//                   <input type="text" name="firstName" id="" placeholder="First Name (Required)" required className="py-2 px-2 border bg-slate-50" />
//                   <input type="text" name="lastName" id="" placeholder="Last Name (Required)" required className="py-2 px-2 border bg-slate-50" />
//                   <input type="email" name="email" id="" placeholder="Email (Required)" required className="py-2 px-2 border bg-slate-50" />
//                   <input type="tel" name="phone" id="" placeholder="Phone (Required)" required className="py-2 px-2 border bg-slate-50" />
//                   <input type="text" name="address" id="" placeholder="Address" className="py-2 px-2 border bg-slate-50" />
//                   <input type="text" name="city" id="" placeholder="city" className="py-2 px-2 border bg-slate-50" />

//                 </div>
//                 <textarea name="message" id="" cols="30" rows="5" placeholder="Message" className="py-2 px-2 border bg-slate-50 w-full"></textarea>
//                 <div className="flex gap-2">
//                   <label for="time">Arrival</label>
//                  <input type="time" name="time" id="time" placeholder="Arrival" />
//                 </div>
//                 <input type="text" placeholder="Coupon" className="py-2 px-2 border bg-slate-50 w-full"  />
//                 <div>

//                   <button id="confirmButton" className="bg-[#BE9874] py-2 px-8 text-sm text-white">Confirm</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default BookingForm
