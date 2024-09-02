import Chart from 'react-apexcharts';

const StatCard = ({ title, value, percentageChange, chartOptions, series, icon }) => {
  return (
    <div style={{ background: '#FCC7D1', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4>{title}</h4>
        <h2>{value}</h2>
        <p style={{ color: percentageChange < 0 ? '#ff0000' : '#00ff00' }}>
          {percentageChange < 0 ? '↓' : '↑'} {Math.abs(percentageChange)}% Last Month
        </p>
      </div>
      <div>
        {icon}
        <Chart options={chartOptions} series={series} type="line" width="100" height="50" />
      </div>
    </div>
  );
};

export default StatCard;
