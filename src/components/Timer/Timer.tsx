import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import './Timer.scss';

interface Props {
	paused: boolean;
	duration: number;

	onTimeExpiration(): void;

	onPause(secondsLeft: number): void;
}

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
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

	const timerStyle: CSSProperties = {
		'--deg': `${360 - (360 / duration) * seconds} `,
		'--col': `hsla(${(100 / duration) * seconds}, 100%, ${50 - duration / seconds}%, 1)`,
	};

	return (
		<div className="timer" style={timerStyle}>
			{seconds}
		</div>
	);
};

export default Timer;
