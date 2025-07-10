import { useState, useEffect } from "react";

interface TimerProps {
  endDate: string;
  className?: string;
}

const Timer = ({ endDate, className = "" }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const difference = end - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className={`flex justify-center space-x-8 ${className}`}>
      <div className="text-center">
        <div className="text-3xl font-bold font-orbitron">
          {timeLeft.days.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400">DAYS</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold font-orbitron">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400">HOURS</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold font-orbitron">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400">MINUTES</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold font-orbitron">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400">SECONDS</div>
      </div>
    </div>
  );
};

export default Timer;
