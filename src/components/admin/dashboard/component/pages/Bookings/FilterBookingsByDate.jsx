import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const FilterBookingsByDate = ({ fetchBookings, setAllBookingData, allBookingData }) => {
  const handleDateChange = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      // Convert Moment dates to JavaScript Date objects for the start and end of the selected range
      const startDate = dates[0].startOf("day").toDate(); // Use moment's startOf('day') to include the entire day
      const endDate = dates[1].endOf("day").toDate(); // Use endOf('day') to include the entire day

      // Filter bookings based on the date range
      const filteredData = allBookingData.filter((item) => {
        // Convert the check-in date string from MM/DD/YYYY format to a Date object
        const checkInDate = new Date(item.checkIn); // Date parsing here assumes the date string is in MM/DD/YYYY format
        return checkInDate >= startDate && checkInDate <= endDate;
      });

      setAllBookingData(filteredData);
    } else {
      // Reset to original data if no valid date range is selected
      fetchBookings(); // Assumes fetchBookings will reset the data to the initial full dataset
    }
  };
  return (
    <>
      <RangePicker
        onChange={handleDateChange}
        // format="DD/MM/YYYY"
        format="MM/DD/YYYY"
      />
    </>
  );
};

export default FilterBookingsByDate;
