import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { userRequest } from '../requestMethod';

export const HeartRateChart = (props) => {
  const [heartRateData, setHeartRateData] = useState([]);
  const userId = props.user._id;
  useEffect(() => {
    // Gửi yêu cầu API sau mỗi giây
    const interval = setInterval(() => {
      fetchHeartRateData();
    }, 1000);

    // Xóa interval khi component bị hủy
    return () => {
      clearInterval(interval);
    };
  }, []);

  const parseTime = (originalDateTime) => {
    const dateObj = new Date(originalDateTime);

    // Chuyển sang múi giờ thứ 7
    const utcOffset = 7 * 60; // Đặt offset là 7 giờ (vì múi giờ thứ 7)
    const adjustedDate = new Date(dateObj.getTime() + utcOffset * 60000);
    
    // Lấy giờ, phút và giây
    const hours = adjustedDate.getUTCHours();
    const minutes = adjustedDate.getUTCMinutes();
    const seconds = adjustedDate.getUTCSeconds();
    
    // Tạo chuỗi giờ, phút, giây
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }

  const fetchHeartRateData = async () => {
    try {
      // Gửi yêu cầu GET tới server để lấy dữ liệu nhịp tim
      const response = await userRequest.get(`heart_rate/today/${userId}`);

      if (response.data) {
        const heartRateData = response.data;
        const data = heartRateData.map(obj => ({heartRate: obj.value, time: parseTime(obj.createdAt)}));
        setHeartRateData(data);
      } else {
        console.error('Failed to fetch heart rate data');
      }
    } catch (error) {
      console.error('Error occurred while fetching heart rate data:', error);
    }
  };
  // Dữ liệu nhịp tim trong 10 lần gần nhất

  return (
    <div className = "heart-rate-chart">
      <LineChart width={950} height={300} data={heartRateData}>
        <XAxis dataKey="time" width={1000} />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

