import { useEffect, useState } from 'react';

const TimeFormat = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return 'Vừa xong';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}p trước`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h trước`;
    } else if (diffInDays < 30) {
      return `${diffInDays} ngày trước`;
    } else {
      return past.toLocaleDateString('vi-VN');
    }
  };

  useEffect(() => {
    setTimeAgo(formatTimeAgo(timestamp));

    const timer = setInterval(() => {
      setTimeAgo(formatTimeAgo(timestamp));
    }, 60000);

    return () => clearInterval(timer);
  }, [timestamp]);

  return timeAgo
};

export default TimeFormat;
