import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Timer.scss';

interface Props {
	paused: boolean;
	duration: number;

	onTimeExpiration(): void;

	onPause(secondsLeft: number): void;
}

const Timer: React.FC<Props> = (timerProps) => {
	const { paused, duration, onTimeExpiration, onPause } = timerProps;
	const [seconds, setSeconds] = useState(duration);
	const timer = useRef<number | undefined>();
	const clearInterval = useCallback((timer) => {
		if (timer.current) window.clearInterval(timer.current);
		timer.current = undefined;
	}, []);

	useEffect(() => {
		if (seconds <= 0) {
			onTimeExpiration();
		} else {
			paused
				? onPause(seconds)
				: (timer.current = window.setInterval(() => setSeconds((v) => v - 1), 1000));
		}
		return () => clearInterval(timer);
	}, [seconds, onTimeExpiration, clearInterval, paused, onPause]);

	return <div className="timer">{seconds}</div>;
};

export default Timer;
