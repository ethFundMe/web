'use client';

import { useCallback, useEffect, useState } from 'react';

export const useCountdown = (targetDate: Date) => {
  const countDownDate = new Date(targetDate).getTime();

  const calculateTimeLeft = useCallback(() => {
    const diff = countDownDate - new Date().getTime();
    return diff > 0 ? diff : 0;
  }, [countDownDate]);

  const [countDown, setCountDown] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};
