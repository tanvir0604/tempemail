import { useEffect, useState, useRef } from 'react';
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
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Set initial time immediately
        setTimeLeft(Math.floor((expiredAt.getTime() - Date.now()) / 1000));

        // Start interval
        timerRef.current = setInterval(() => {
            const left = Math.floor((expiredAt.getTime() - Date.now()) / 1000);

            if (left <= 0) {
                setTimeLeft(0);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
                onComplete?.();
            } else {
                setTimeLeft(left);
            }
        }, 1000);

        // Cleanup
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [expiredAt]);

    return (
        <span className={getColor(timeLeft, reversed)}>
            {formatTime(timeLeft)}
        </span>
    );
}
