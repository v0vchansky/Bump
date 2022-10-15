import { useEffect, useState } from 'react';

const formatter = (val: number, withZeros: boolean) => {
    if (withZeros && val.toString().length === 1) {
        return `0${val}`;
    }

    return val.toString();
};

const getReturnValues = (countDown: number, withZeros: boolean) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = formatter(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), withZeros);
    const minutes = formatter(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)), withZeros);
    const seconds = formatter(Math.floor((countDown % (1000 * 60)) / 1000), withZeros);

    return { days, hours, minutes, seconds };
};

const useCountdown = ({ targetDate, withZeros }: { targetDate?: string | Date; withZeros?: boolean }) => {
    const now = new Date();
    const countDownDate = new Date(targetDate || now).getTime();

    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            const updated = countDownDate - new Date().getTime();

            setCountDown(updated);

            if (updated <= 0) {
                clearInterval(interval);

                return;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return {
        isInProcess: countDown > 900,
        countDown: getReturnValues(countDown, Boolean(withZeros)),
    };
};

export { useCountdown };
