/* eslint-disable react/prop-types */
import { Modal, Spin } from "antd";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
// import Modal from "./ModalDetails";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import NewBookedRoom from "./NewBookedRoom";
import BookedHistory from "./BookedHistory";
import { differenceInCalendarDays } from "date-fns";
// import ModalDetails from "./ModalDetails";

const BookedRooms = ({ loading, bookedData }) => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("booking");
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState();
  const [nights, setNights] = useState("");
  const [total, setTotal] = useState("");

  const newBookings = bookedData.filter((booking) => booking.bookingStatus === "Booked");
  const completedBookings = bookedData.filter((booking) => booking.bookingStatus === "completed");

  function calculateTotalCost(booking) {
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

  const showModal = (room) => {
    setSelectedRoom(room);
    console.log(room, "checking room detais ");
    const { nights, totalCost } = calculateTotalCost(room);
    setTotal(totalCost);
    setNights(nights);
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center py-5">
        <Spin />
      </div>
    );
  }

  return (
    <>
      <NewBookedRoom newBookings={newBookings} showModal={showModal} />

      <BookedHistory completedBookings={completedBookings} showModal={showModal} />
      <Modal
        width={800}
        open={open}
        title={t("Booking Details")}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn }) => (
          <>
            <div className=" flex justify-evenly">
              <button className="bg-[#151516] hover:bg-[#1d1d1f] text-white font-bold py-1 px-3 rounded transition duration-300">
                close
              </button>

              {/* <CancelBtn  /> */}
              <OkBtn />
            </div>
          </>
        )}
      >
        {/* Your booking details markup */}
        {selectedRoom && (
          <div className="container mx-auto mt-5 p-4">
            <div className="md:flex">
              <div className="md:w-1/2">
                {selectedRoom.roomId.images && selectedRoom.roomId.images.length > 0 && (
                  <LazyLoadImage
                    className=" w-full h-64 object-cover    relative"
                    src={selectedRoom.roomId.images[0]}
                    alt={`awalive $room.roomId.images[0]}`}
                    effect="blur"
                    placeholderSrc={""}
                  />
                )}
              </div>
              <div className="md:w-1/2 px-4 md:px-8">
                <h2 className="text-xl font-bold mb-3">{selectedRoom?.roomId?.title}</h2>
                <p className="text-gray-600 mb-2">
                  {t("Booking Number")}: <span className="font-semibold"> {selectedRoom?.bookingNumber}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  {t("Payment")}: <span className="font-semibold"> {selectedRoom?.paymentStatus}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  {t("Booking Status")}: <span className="font-semibold"> {selectedRoom?.bookingStatus}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  {t("Check In")}: <span className="font-semibold"> {dayjs(selectedRoom?.checkIn).format("MMM D, YYYY")}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  {t("Check Out")}: <span className="font-semibold">{dayjs(selectedRoom?.checkOut).format("MMM D, YYYY")}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  {t("guest")}: <span className="font-semibold">{selectedRoom?.numberOfGuests}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  {t("night")}: <span className=" font-semibold">{nights}</span>
                </p>
                <p className="text-gray-600 ">
                  {/* {t('total')}: <span className="text-lg font-semibold">{selectedRoom.totalWithTax} {t('SAR')}</span> */}
                </p>
                {/* <p className="text-[10px] text-gray-400 italic mb-4"> {t('Including 15% vat')} </p> */}
                <div className="border-t-[1px] border-gray-200 pt-4">
                  {/* <div>
                    <div>
                      <p>{nights} Night X </p>
                      <p>Night</p>
                    </div>
                  </div> */}
                  <div className="bg-white   flex flex-col">
                    <div className="mb-4  border px-8 pt-6 pb-8 ">
                      <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-700 text-lg">{t("Subtotal")}</span>
                        <span className="text-gray-900 text-lg">SR{total}</span>
                      </div>
                      <div className="flex justify-between pt-4">
                        <span className="text-gray-700 text-lg font-bold">{t("total")}</span>
                        <span className="text-gray-900 text-lg font-bold">SAR {total}</span>
                      </div>
                      {/* <p className="text-[10px] text-gray-400 italic "> {t("Including 15% vat")} </p> */}
                    </div>
                    {/* <button className="bg-black text-white font-bold py-2 px-4  hover:bg-gray-700 focus:outline-none focus:shadow-outline">
    {selectedRoom.paymentStatus}
  </button> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="p-4 md:p-8 border-t-[1px] border-gray-200">
              <h3 className="text-xl font-semibold mb-3">{t("Special Instructions")}</h3>
              <p className="text-gray-600">
                
                {selectedRoom.formData.message ? selectedRoom?.formData?.message : "No message Special Instructions"}
              </p>
            </div> */}
          </div>
        )}
      </Modal>
    </>
  );
};

export default BookedRooms;
