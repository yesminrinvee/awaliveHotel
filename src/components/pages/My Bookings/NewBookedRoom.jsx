/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Booked from "./Booked";

const NewBookedRoom = ({ newBookings, showModal,  }) => {
    const {t} = useTranslation('booking')


  return (
    <section className=" bg-slate-100 py-10">
      <div className="md:max-w-5xl mx-auto ">
        <h1 className="mb-4  text-xl font-semibold" style={{ fontFamily: "Gilda Display, serif" }}>{t("New Booking")}</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {newBookings &&  newBookings.length > 0 ? (
            newBookings.map((room) => (
              // <Space  >
              <Booked key={room._id} room={room} showModal={showModal} />
              // </Space>
            ))
          ) : (
            <p className=" text-gray-400">No Room Booked Yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewBookedRoom;
