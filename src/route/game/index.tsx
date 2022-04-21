import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import '../../components/questions/style.css';
import {GameContext, ResultGame, WindowState} from '../../store/game-context';
import Timer from '../../components/Timer/Timer';
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap';
import {getRightAnswer} from "../../components/questions";

const SECONDS_TO_ANSWER = 30;

enum AnswerStatuses {
	Pending = "pending",
	Wrong = "wrong",
	Correct = "correct",
}

const GameWindow: React.FC = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [isPaused, setPaused] = useState(false);
	const [answer, setAnswer] = useState<undefined | number>(undefined);
	const [answerStatus, setAnswerStatus] = useState(AnswerStatuses.Pending);
	const rightAnswer = useRef<undefined | number>(undefined);
	const secondsLeftAfterAnswer = useRef(SECONDS_TO_ANSWER);

	const {
		questionNumber,
		questionText,
		questionVariants,
		gameMove,
		switchWindow,
		setResultGame,
		score,
		questionId,
	} = useContext(GameContext);

	useEffect(() => {
		rightAnswer.current = getRightAnswer(questionId);
		return () => {
			setAnswer(undefined)
			rightAnswer.current = undefined;
			setIsDisabled(false);
			setPaused(false);
		}
	}, [questionId])

	const getAnswerButtonClassName = (index: number) : string => {
		if (answer && index === answer)
				return answerStatus;
		if (answerStatus === AnswerStatuses.Wrong && index === rightAnswer.current)
				return AnswerStatuses.Correct;
		return "";

	}

	const handleClick = (index: number) => {
		setPaused(true);
		setIsDisabled(true);
		setAnswer(index);
		setAnswerStatus(AnswerStatuses.Pending)
		setTimeout(() => {
			index === rightAnswer.current
				? setAnswerStatus(AnswerStatuses.Correct)
				: setAnswerStatus(AnswerStatuses.Wrong);
			setTimeout( () => {
				gameMove(rightAnswer.current === index, secondsLeftAfterAnswer.current);
			}, 3000)
		}, 3000);
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
				<LevelRoadmap currentLevel={questionNumber + 1} safetyLevels={[5, 10, 15]}/>
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
									data-button={getAnswerButtonClassName(variant.id)}
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
