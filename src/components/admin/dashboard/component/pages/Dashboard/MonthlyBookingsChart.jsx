import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const MonthlyBookingsChart = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchBookingsData = async () => {
      setLoading(true);
      try {
        // Simulated fetched data
        const data = await new Promise(resolve => setTimeout(() => resolve([
          { month: 'January', bookings: 120 },
          { month: 'February', bookings: 150 },
          { month: 'March', bookings: 80 },
          { month: 'Apr', bookings: 80 },
          { month: 'May', bookings: 20 },
          { month: 'Jun', bookings: 30 },
          { month: 'Jul', bookings: 21 },
          { month: 'Aug', bookings: 60 },
          { month: 'Sep', bookings: 180 },
          { month: 'Oct', bookings: 39 },
          { month: 'Nav', bookings: 112 },
          { month: 'Dec', bookings: 68 },
          // Add other months...
        ]), 1000));
        setBookingsData(data);
      } catch (error) {
        console.error('Failed to fetch bookings data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsData();
  }, []);

  const chartOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: bookingsData.map(data => data.month),
    },
    yaxis: {
      title: {
        text: 'Number of Bookings'
      }
    }
  };

  const series = [{
    name: 'Bookings',
    data: bookingsData.map(data => data.bookings)
  }];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Chart options={chartOptions} series={series} type="bar" height={350} width={500} />
    </div>
  );
};

export default MonthlyBookingsChart;
