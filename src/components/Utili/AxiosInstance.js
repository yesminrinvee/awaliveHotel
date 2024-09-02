import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Set your base URL here
  timeout: 5000, // Set a timeout if needed
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});

export default axiosInstance;
