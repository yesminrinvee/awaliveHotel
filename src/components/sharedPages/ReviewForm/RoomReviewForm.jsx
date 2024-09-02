import { Spin, notification } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

// eslint-disable-next-line react/prop-types
const RoomReviewForm = ({ roomId }) => {
  const currentLanguage = i18next.language;
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [reviewPostingLoading, setReviewPostingLoading] = useState(false);
  const { t } = useTranslation("booking");

  useEffect(() => {
    if (user && user?.email) {
      setEmail(user?.email); // Set the email from user context
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!message) {
      newErrors.message = "Message is required";
    }

    if (rating === 0) {
      newErrors.rating = "Rating is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // posting room review along with room id and user email id
  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviewPostingLoading(true);
    if (!validateForm()) return;
    // Handle the form submission logic here to post an axios method to post

    // Retrieve the user's token, for example, from local storage
    const token = localStorage.getItem("token"); // Replace with your token retrieval method
    const reviewData = {
      userId: user.id,
      roomId: roomId,
      rating,
      email,
      message,
    };
    try {
      const response = await axios.post("https://server.awalivhotel.com/api/review/create", reviewData, {
      // const response = await axios.post("https://type-script-server.vercel.app/api/review/create", reviewData, {
        headers: {
          Authorization: token,
        },
      });
      notification["success"]({
        message: "Successful",
        description: `${response.data.message}`,
        placement: "topRight",
        duration: 3.5,
      });

      setReviewPostingLoading(false);
      setMessage("");
      setRating("");
    } catch (err) {
      notification["error"]({
        message: `${err.response.data.issues[0].path} ${err.response.data.message}`,
        description: `${err.response.data.issues[0].path} ${err.response.data.issues[0].message}`,
        placement: "topRight",
        duration: 3.5,
      });
    }
    setReviewPostingLoading(false);
  };

  return (
    <form  onSubmit={handleSubmit} className={`max-w-lg  py-4  ${currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"} `}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t("emailReview")}
        </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder={user?.email}
          readOnly
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1 block w-full px-3 py-2  ${
            errors.email ? "border-red-500" : "border-gray-300"
          }  shadow-sm focus:outline-none focus:ring-[#BE9874] focus:border-[#BE9874]`}
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{t("ratingReview")}</label>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${errors.rating ? "text-red-500 text-md" : "text-2xl text-[#BE9874]"}`}
            >
              {star <= rating ? "★" : "☆"}
            </span>
          ))}
        </div>
        {errors.rating && <p className="text-red-500 text-xs italic">{errors.rating}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="message" className={`block text-sm font-medium text-gray-700  ${currentLanguage === 'ar' ? 'body-ar' : 'body-en'}`}>
          {t("messageReview")}
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-[#BE9874] focus:border-[#BE9874] `}
        />
        {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
      </div>

      {user ? (
        reviewPostingLoading ? (
          <Spin />
        ) : (
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0 || !email || !message || rating === 0}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium  text-white bg-[#BE9874] hover:bg-[#b98e65] focus:outline-none  disabled:opacity-50"
          >
            {t("submitReview")}
          </button>
        )
      ) : (
        <span className="text-red-500 text-xs italic">{t("reviewWarning")}</span>
      )}
    </form>
  );
};

export default RoomReviewForm;
