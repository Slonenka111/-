import React, { useCallback, useContext, useRef, useState } from 'react';
import '../../components/questions/style.css';
import { GameContext, ResultGame, WindowState } from '../../store/game-context';
import Timer from '../../components/Timer/Timer';
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap';

const SECONDS_TO_ANSWER = 30;

const GameWindow: React.FC = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [isPaused, setPaused] = useState(false);
	const secondsLeftAfterAnswer = useRef(SECONDS_TO_ANSWER);

	const toggleIsDisabled = useCallback(() => {
		setIsDisabled((prevState) => !prevState);
	}, [setIsDisabled]);

	const {
		questionNumber,
		questionText,
		questionVariants,
		gameMove,
		switchWindow,
		setResultGame,
		score,
	} = useContext(GameContext);

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
	}, [switchWindow]);

	return (
		<div>
			<div>{score}</div>
			<div className="game-controls">
				<Timer
					key={questionNumber}
					paused={isPaused}
					duration={SECONDS_TO_ANSWER}
					onTimeExpiration={handleTimeExpiration}
					onPause={(secondsLeft) => (secondsLeftAfterAnswer.current = secondsLeft)}
				/>
				<LevelRoadmap currentLevel={questionNumber + 1} safetyLevels={[5, 10, 15]} />
			</div>
			<div className="question">
				<div className="question__container--title">
					<div className="question__item--title">
						<div className="question__title">{questionText}</div>
					</div>
				</div>
				<div className="question__container">
					{questionVariants.map((variant) => {
						return (
							<div className="question__item" key={variant.id}>
								<button
									className="question__answer-btn"
									disabled={isDisabled}
									onClick={() => handleClick(variant.id)}
								>
									{variant.text}
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default GameWindow;
