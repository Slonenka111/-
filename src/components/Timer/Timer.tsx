import React, {CSSProperties, useCallback, useEffect, useRef, useState} from 'react';
import './Timer.scss';
import classNames from 'classnames';

export const TIMER_STATE_KEY = "TimerState";

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

const getLeftSeconds = (secondsLeftOnStart: number, startDateTime: number): number => {
	const currentDate = new Date().getTime();
	const passedSeconds = Math.round((currentDate - startDateTime) / 1000);
	return secondsLeftOnStart - passedSeconds;
}

const Timer: React.FC<Props> = (timerProps) => {
	const {paused, duration, onTimeExpiration, onPause} = timerProps;
	const [seconds, setSeconds] = useState(duration);
	const startDate = useRef(new Date().getTime());
	const [expired, setExpired] = useState(false);
	const timer = useRef<number | undefined>();
	const startSeconds = useRef(duration);
	const mounted = useRef(false);
	const clearInterval = useCallback((timer) => {
		if (timer.current) window.clearInterval(timer.current);
		timer.current = undefined;
	}, []);
	const storeTimerPropertiesOnStart = (dateOnTimerStarted: number, secondsOnTimerStarted: number) : void => {
		startDate.current = dateOnTimerStarted;
		startSeconds.current = secondsOnTimerStarted;
		localStorage.setItem(
			TIMER_STATE_KEY,
			JSON.stringify({
				startDate: dateOnTimerStarted,
				secondsOnStart: secondsOnTimerStarted,
			})
		);
	}

	useEffect(() => {
		const timerState = localStorage.getItem(TIMER_STATE_KEY);
		if (timerState != null) {
			const parsedTimerState = JSON.parse(timerState);
			if (typeof parsedTimerState === 'object' && parsedTimerState.startDate && parsedTimerState.secondsOnStart) {
				startDate.current = parsedTimerState.startDate;
				startSeconds.current = parsedTimerState.secondsOnStart;
				const leftSeconds = getLeftSeconds(startSeconds.current, startDate.current);
				setSeconds(Math.max(leftSeconds, 0));
			}
		}
		else {
			storeTimerPropertiesOnStart(new Date().getTime(), duration);
		}
	}, []);

	useEffect(() => {
		if (!paused && mounted.current) {
			storeTimerPropertiesOnStart(new Date().getTime(), seconds);
		}
		mounted.current = true
	}, [paused])

	useEffect(() => {
		if (seconds <= 0) {
			if (!expired) {
				setExpired(true);
				onTimeExpiration();
			}
		} else if (!paused) {
			timer.current = window.setInterval(() => {
				const secondsLeft = getLeftSeconds(startSeconds.current, startDate.current);
				setSeconds(secondsLeft);
			}, 1000);
		} else onPause(seconds);
		return () => clearInterval(timer);
	}, [seconds, clearInterval, expired, onTimeExpiration, paused]);

	const timerStyle: CSSProperties = {
		'--deg': `${360 - (360 / duration) * seconds} `,
		'--col': `hsla(${(100 / duration) * seconds}, 100%, ${
			50 - duration / Math.max(1, seconds)
		}%, 1)`,
	};

	return (
		<div className={classNames('timer', {expired})} style={timerStyle}>
			{seconds}
		</div>
	);
};

export default Timer;
