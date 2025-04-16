import { useEffect, useState } from 'react';

type TickingNumberProps = {
    value: number;
    duration?: number; // optional override for duration in ms
    className?: string;
};

const TickingNumber: React.FC<TickingNumberProps> = ({ value, duration = 300, className }) => {
    const [displayed, setDisplayed] = useState(value);

    useEffect(() => {
        if (displayed === value) return;

        const diff = Math.abs(value - displayed);
        const stepTime = Math.max(duration / diff, 5);
        const direction = value > displayed ? 1 : -1;
        const percentDiff = diff / Math.max(displayed, 1);

        if (percentDiff > 0.8) {
            setDisplayed(value);
            return;
        }

        const interval = setInterval(() => {
            setDisplayed(prev => {
                const next = prev + direction;
                if ((direction === 1 && next >= value) || (direction === -1 && next <= value)) {
                    clearInterval(interval);
                    return value;
                }
                return next;
            });
        }, stepTime);

        return () => clearInterval(interval);
    }, [value, displayed, duration]);

    return <span className={className}>{displayed}</span>;
};

export default TickingNumber;
