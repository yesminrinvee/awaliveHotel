import axios from "axios";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomBanner from "./RoomBanner";
import RoomDetailsBody from "./RoomDetailsBody";
// import RoomDate from "./RoomDate";
import SimilarRoom from "./SimilarRoom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import RoomReviewForm from "../../sharedPages/ReviewForm/RoomReviewForm";
import ReviewCard from "../../sharedPages/ReviewForm/ReviewCard";
import { Helmet } from "react-helmet";
import BestRooms from "./BestRooms";

const RoomDetails = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("booking");
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [singleRoomDetails, setSingleRoomDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);

  // getting all review along with this room id
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`https://server.awalivhotel.com/api/room/${id}?lang=${currentLanguage}`);
        // const response = await axios.get(`https://type-script-server.vercel.app/api/room/${id}?lang=${currentLanguage}`);
        // const response = await axios.get(`http://localhost:5000/api/room/${id}?lang=${currentLanguage}`);
        setSingleRoomDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchRoom();
  }, [id, currentLanguage, t, setSingleRoomDetails]);


  return (
    <>
      <Helmet>
        {loading ? <title> Awalive Hotel Taif</title> : <title>{`${singleRoomDetails.title} - Awaliv Hotel Taif`}</title>}
      </Helmet>

      {loading ? (
        <div className="h-[20rem] flex  items-center justify-center text-center">
          <Skeleton active />
        </div>
      ) : singleRoomDetails ? (
        <>
          <RoomBanner singleRoomDetails={singleRoomDetails} />

          <section  className="max-w-7xl mx-auto px-2 py-7 md:py-16">
            <div className={`py-4 ${currentLanguage === "ar" ? "body-ar font-normal  " : "body-en "} `}>
              <div dir={`${currentLanguage === "ar" ? "rtl" : "ltr"}`}>
                {currentLanguage === "ar" ? (
                  <h1 className={`text-3xl md:text-4xl py-2 text-black capitalize  ${currentLanguage === "ar" && "body-ar"}`}>
                    {singleRoomDetails.title}
                  </h1>
                ) : (
                  <h1
                    className={`text-3xl md:text-4xl py-2 text-black capitalize `}
                    style={{ fontFamily: "Gilda Display, serif" }}
                  >
                    {singleRoomDetails.title}
                  </h1>
                )}

                <div className="text-sm">
                  <p className="">
                    {" "}
                    <strong className="uppercase tracking-widest">{t("bedRoom")}</strong> :{" "}
                    <span className=" uppercase tracking-widest"> {singleRoomDetails?.subTitle?.roomOne}</span>
                  </p>
                  {singleRoomDetails.subTitle?.roomTwo && (
                    <p>
                      {" "}
                      <strong className="uppercase tracking-widest">{t("Bed Room 2")}</strong>{" "}
                      <span className=" uppercase tracking-widest"> : {singleRoomDetails?.subTitle?.roomTwo}</span>
                    </p>
                  )}
                </div>
                <div className="flex gap-1 items-center text-sm uppercase tracking-widest">
                  <div className="flex gap-3 items-center">
                    <p>{t("HOTEL ROOM")}</p>
                    <p>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={"text-2xl text-[#BE9874]"}>
                          {star <= Math.ceil(reviews.averageRating) ? "★" : "☆"}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* <span className="text-sm">
                    {reviews.averageRating}/5 {t("ratingReview")}
                  </span> */}
                </div>
              </div>

              {/* slider  */}
              <RoomDetailsBody singleRoomDetails={singleRoomDetails} />

              <div className="flex flex-col-reverse md:flex-row   gap-6 px-3 md:px-0 ">
                <div dir={`${currentLanguage === "ar" ? "rtl" : "ltr"}`} className="w-full md:w-2/3 ">
                  <h1
                    className={`text-2xl   py-5 md:py-4  ${currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"} `}
                  >
                    {t("reviews")}
                  </h1>
                  <ReviewCard
                    roomId={id}
                    reviews={reviews}
                    setReviews={setReviews}
                    reviewLoading={reviewLoading}
                    setReviewLoading={setReviewLoading}
                  />
                  <RoomReviewForm roomId={id} setReviews={setReviews} />
                </div>
                <div className="w-full md:w-1/3 ">

                <BestRooms />
                </div>
              </div>

              <div dir={`${currentLanguage === "ar" ? "rtl" : "ltr"}`} className="my-10">
                <div className="pb-7 px-3 md:px-0 ">
                  <h1
                    className={`text-2xl md:text-4xl  text-black capitalize  ${
                      currentLanguage === "ar" ? "body-ar font-medium" : "body-en-title"
                    }`}
                  >
                    {t("Similar Room")}
                  </h1>

                  <p className=" bg-black w-10 h-[2px] my-2" />
                </div>
                <SimilarRoom currentRoomId={singleRoomDetails.id} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <p className="h-screen">Room not found</p>
      )}
    </>
  );
};

export default RoomDetails;
