import React, { useEffect, useRef, useState } from 'react';
import './Timer.css';

interface Props {
	paused: boolean;
	duration: number;

	onTimeExpiration?(): void;

	onPause?(secondsLeft: number): void;
}

const Timer: React.FC<Props> = (timerProps) => {
	const { paused, duration, onTimeExpiration, onPause } = timerProps;
	const [seconds, setSeconds] = useState(duration);
	const timer = useRef<number | undefined>();

	useEffect(() => {
		if (seconds <= 0) {
			onTimeExpiration && onTimeExpiration();
		} else if (paused) {
			onPause && onPause(seconds);
		} else {
			timer.current = window.setInterval(() => setSeconds((v) => v - 1), 1000);
			console.log(timer.current + ' started');
		}
		return () => {
			if (timer.current) {
				window.clearInterval(timer.current);
				console.log(timer.current + ' cleared');
				timer.current = undefined;
			}
		};
	}, [seconds, paused, onTimeExpiration, onPause]);

	return <div className="timer">{seconds}</div>;
};

export default Timer;
