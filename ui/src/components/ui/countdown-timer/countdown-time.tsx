import { FC, useEffect, useState } from 'react';

interface ICountDownTime {
    initialTime: string;
    onFinish: () => void;
}

const defaultTime = {
    hours: '00',
    minutes: '00',
    seconds: '00',
};

export const CountDownTime: FC<ICountDownTime> = ({
    initialTime,
    onFinish,
}) => {
    const [ remainingTime, setRemainingTime ] = useState(defaultTime);

    useEffect(() => {
        const interval = setInterval(() => {
            const time = new Date(initialTime);
            const now = new Date();
            const diff = time.getTime() - now.getTime();

            if ( diff <= 0 ) {
                clearInterval(interval);
                setRemainingTime(defaultTime);
                onFinish();
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setRemainingTime({
                hours: hours.toString().length > 1 ? hours.toString() : `0${ hours }`,
                minutes: minutes.toString().length > 1 ? minutes.toString() : `0${ minutes }`,
                seconds: minutes.toString().length > 1 ? seconds.toString() : `0${ seconds }`,
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="flex flex-row gap-0 text-lg">
            <span>{ remainingTime.hours }</span>
            <span>:</span>
            <span>{ remainingTime.minutes }</span>
            <span>:</span>
            <span>{ remainingTime.seconds }</span>
        </div>
    );
};
