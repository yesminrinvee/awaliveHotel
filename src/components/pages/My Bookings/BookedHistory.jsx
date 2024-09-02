/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

import Booked from "./Booked";

const BookedHistory = ({ completedBookings, showModal }) => {
  const { t } = useTranslation("booking");
  console.log(completedBookings,'hjaeh');
  return (
    
    <section className=" bg-slate-100 py-10">
      {completedBookings.length > 0 && (
        <div className="md:max-w-5xl mx-auto ">
        <h1 className="mb-4  text-xl font-semibold" style={{ fontFamily: "Gilda Display, serif" }}>{t("History Booking")}</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {completedBookings &&  completedBookings.length > 0 ? (
            completedBookings.map((room) => (
              // <Space  >
              <Booked key={room._id} room={room} showModal={showModal} />
              // </Space>
            ))
          ) : (
            <p className=" text-gray-400">No Room Booked Yet.</p>
          )}
        </div>
      </div>
      )}
    </section>
  );
};

export default BookedHistory;
