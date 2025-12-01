import { useEffect, useState } from 'react';
import { formatTime, getColor } from '@/lib/utils';

export default function TimeLeft({
    expiredAt,
    reversed = false,
    onComplete,
}: {
    expiredAt: Date;
    reversed?: boolean;
    onComplete?: () => void;
}) {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    useEffect(() => {
        setTimeLeft(Math.floor((expiredAt.getTime() - Date.now()) / 1000));
    }, [expiredAt]);
    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete && onComplete();
            setTimeLeft(0);
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) return 0;
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <span className={getColor(timeLeft, reversed)}>
            {formatTime(timeLeft)}
        </span>
    );
}
