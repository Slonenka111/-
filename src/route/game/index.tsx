import React, { useCallback, useContext, useRef, useState } from 'react';
import '../../components/questions/style.scss';
import { GameContext, ResultGame, WindowState } from '../../store/game-context';
import Timer from '../../components/Timer/Timer';
import { LevelRoadmap } from '../../components/LevelRoadmap/LevelRoadmap';
import './style.scss';

const SECONDS_TO_ANSWER = 30;

const GameWindow: React.FC = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [isPaused, setPaused] = useState(false);
	const secondsLeftAfterAnswer = useRef(SECONDS_TO_ANSWER);

	const toggleIsDisabled = useCallback(() => {
		setIsDisabled((prevState) => !prevState);
	}, [setIsDisabled]);

	const { questionNumber, questionText, questionVariants, gameMove, switchWindow, setResultGame } =
		useContext(GameContext);

	const handleClick = (index: number) => {
		setPaused(true);

		toggleIsDisabled();
		setTimeout(() => {
			toggleIsDisabled();
			gameMove(index, secondsLeftAfterAnswer.current);
			setPaused(false);
		}, 1000);
	};

	const handleTimeExpiration = useCallback(() => {
		switchWindow(WindowState.end);
		setResultGame(ResultGame.lose);
	}, [setResultGame, switchWindow]);

	return (
		<div className="game-window container">
			<div className="game-window__header">
				<div className="game-window__header--side">
					<div>Тут подсказки Тут подсказки Тут подсказки Тут подсказки</div>
				</div>
				<div className="game-window__header--middle">
					<Timer
						key={questionNumber}
						paused={isPaused}
						duration={SECONDS_TO_ANSWER}
						onTimeExpiration={handleTimeExpiration}
						onPause={(secondsLeft) => (secondsLeftAfterAnswer.current = secondsLeft)}
					/>
				</div>
				<div className="game-window__header--side">
					<LevelRoadmap currentLevel={questionNumber + 1} safetyLevels={[5, 10, 15]} />
				</div>
			</div>
			<div className="question">
				<div className="question__container question__container--title">
					<div className="question__item--title">
						<div className="question__title">{questionText}</div>
					</div>
				</div>
				<div className="question__container button__container button__container--multiple">
					<div className="button__container-item">
						{questionVariants.map((variant) => {
							if (variant.id < 3) {
								return (
									<div className="button__wrapper" key={variant.id}>
										<button
											className="button__item question__btn"
											disabled={isDisabled}
											onClick={() => handleClick(variant.id)}
										>
											<span className="text--primary">{variant.id < 2 ? 'A: ' : 'B: '}</span>
											{variant.text}
										</button>
									</div>
								);
							}
						})}
					</div>
					<div className="button__container-item">
						{questionVariants.map((variant) => {
							if (variant.id > 2) {
								return (
									<div className="button__wrapper" key={variant.id}>
										<button
											className="button__item question__btn"
											disabled={isDisabled}
											onClick={() => handleClick(variant.id)}
										>
											<span className="text--primary">{variant.id < 4 ? 'C: ' : 'D: '}</span>
											{variant.text}
										</button>
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameWindow;
