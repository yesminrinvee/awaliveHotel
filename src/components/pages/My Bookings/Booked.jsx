import React from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import { differenceInCalendarDays } from "date-fns";
import i18next from "i18next";

const Booked = ({ room, showModal }) => {
  const { t } = useTranslation("booking");
  const currentLanguage = i18next.language;

  function calculateTotalCost(booking) {
    // Check if priceOptions and checkIn/checkOut dates are available
    if (!booking.roomId || !booking.roomId.priceOptions || booking.roomId.priceOptions.length === 0 || !booking.checkIn || !booking.checkOut) {
      return { nights: 0, totalCost: 0 };
    }

    // Parse the check-in and check-out dates
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);

    // Calculate the number of nights
    const nights = differenceInCalendarDays(checkOutDate, checkInDate);

    // Assuming you want to use the first price option for calculation
    const pricePerNight = booking.roomId.priceOptions[0].price;

    // Calculate the total cost
    const totalCost = nights * pricePerNight;

    return { nights, totalCost };
  }

  // Check if room and roomId data are available
  if (!room || !room.roomId) {
    return null; // Render nothing if data is missing
  }

  const { nights, totalCost } = calculateTotalCost(room);

  return (
    <div
      type="primary"
      onClick={() => showModal(room)}
      className={`${currentLanguage === "ar" ? "body-ar font-medium " : "body-en"}`}
    >
      <div className="bg-white py-5 px-5 cursor-pointer">
        <div className="flex justify-between items-center pb-2 px-2">
          <p className="font-semibold text-sm">{t("Complete payment in")}</p>
          <p className="text-end font-semibold text-sm text-red-400">{t("Check In")}</p>
        </div>
        <div className="px-4 py-2 border">
          <div className="py-4 flex flex-col md:flex-row gap-4 border-b-[1px]">
            <div>
              {room.roomId.images && room.roomId.images.length > 0 && (
                <LazyLoadImage
                  className="md:w-44 md:h-28 object-cover relative"
                  src={room.roomId.images[0]}
                  alt={`awalive ${room.roomId.images[0]}`}
                  effect="blur"
                  placeholderSrc={""}
                />
              )}
            </div>
            <div>
              <h1 className="font-semibold text-sm">{room.roomId.title}</h1>
              <h2 className="font-semibold text-sm text-gray-400">{room.roomId.subTitle?.roomOne}</h2>
              <div className="grid grid-cols-2 gap-1 py-4 text-sm">
                <p>
                  {nights} {t("night")}
                </p>
                <p>
                  {room.numberOfGuests} {t("guest")}
                </p>
                <p className="font-semibold">{room.bookingStatus}</p>
                <p>
                  {t("total")}: {totalCost} {t("SAR")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="font-semibold">
              <p className="text-xs">{t("Check In")}</p>
              <p className="text-sm">{dayjs(room.checkIn).format("MMM D, YYYY")}</p>
            </div>
            <div>
              <p className="w-3 h-3 rounded-full bg-[#BE9874]"></p>
            </div>
            <div className="font-semibold">
              <p className="text-xs">{t("Check Out")}</p>
              <p className="text-sm">{dayjs(room.checkOut).format("MMM D, YYYY")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booked;
