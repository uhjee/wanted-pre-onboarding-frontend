import { useRef } from 'react';

const useThrottle = <T extends any[]>(callback: (...args: T) => void, time: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttleHandler = (...args: T) => {
    if (timer.current) return;
    timer.current = setTimeout(() => {
      callback(...args);
      timer.current = null;
    }, time);
  };
  return [throttleHandler];
};

export default useThrottle;
