import { FaCalendarAlt } from "react-icons/fa";
import StatCard from "./StatCard";
import { FaDollarSign } from "react-icons/fa6";
import MonthlyBookingsChart from "./MonthlyBookingsChart";



const Dashboard = () => {
    const bookingsOptions = {
        chart: {
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          curve: 'smooth'
        },
        colors: ['#FF4560'],
        tooltip: {
          enabled: false
        }
      };
    
      const bookingsSeries = [{
        name: 'Bookings',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }];
    
      const revenueOptions = {
        chart: {
          sparkline: {
            enabled: true
          }
        },
        colors: ['#FF4560'],
        tooltip: {
          enabled: false
        }
      };
    
      const revenueSeries = [{
        name: 'Revenue',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
      }];
  return (
    <>
    <div className="w-full flex justify-between">
      <MonthlyBookingsChart />
      <MonthlyBookingsChart />
      {/* <StatCard
        title="Revenue"
        value="$85420"
        percentageChange={-2.1}
        chartOptions={revenueOptions}
        series={revenueSeries}
        icon={<FaDollarSign />}
        /> */}
    </div>
        </>
  
  )
}

export default Dashboard