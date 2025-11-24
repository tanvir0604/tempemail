import { useEffect, useState } from "react";
import { formatTime, getColor } from "@/lib/utils";

export default function TimeLeft({ expiredAt }: { expiredAt: Date }) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  useEffect(() => {
    setTimeLeft(Math.floor((expiredAt.getTime() - Date.now()) / 1000));
  }, [expiredAt]);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <span className={getColor(timeLeft)}>{formatTime(timeLeft)}</span>;
}
