import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import '../../components/questions/style.scss';
import { GameContext, ResultGame, WindowState } from '../../store/game-context';
import Timer from '../../components/Timer/Timer';
import { LevelRoadmap } from '../../components/LevelRoadmap/LevelRoadmap';
import './style.scss';
import { getRightAnswer } from '../../components/questions';
import classNames from 'classnames';

const SECONDS_TO_ANSWER = 30;

enum AnswerStatuses {
	Pending = 'pending',
	Wrong = 'wrong',
	Correct = 'correct',
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
		questionId,
	} = useContext(GameContext);

	useEffect(() => {
		rightAnswer.current = getRightAnswer(questionId);
		return () => {
			setAnswer(undefined);
			rightAnswer.current = undefined;
			setIsDisabled(false);
			setPaused(false);
		};
	}, [questionId]);

	const getAnswerButtonClassName = (index: number): string => {
		if (answer && index === answer) return answerStatus;
		if (answerStatus === AnswerStatuses.Wrong && index === rightAnswer.current)
			return AnswerStatuses.Correct;
		return '';
	};

	const handleClick = (index: number) => {
		setPaused(true);
		setIsDisabled(true);
		setAnswer(index);
		setAnswerStatus(AnswerStatuses.Pending);
		setTimeout(() => {
			index === rightAnswer.current
				? setAnswerStatus(AnswerStatuses.Correct)
				: setAnswerStatus(AnswerStatuses.Wrong);
			setTimeout(() => {
				gameMove(rightAnswer.current === index, secondsLeftAfterAnswer.current);
			}, 3000);
		}, 3000);
	};

	const handleTimeExpiration = useCallback(() => {
		switchWindow(WindowState.end);
		setResultGame(ResultGame.lose);
	}, [setResultGame, switchWindow]);

	const ButtonsContainer: React.FC<{ containerNumber: 1 | 2 }> = ({ containerNumber }) => {
		const firstVariantId = containerNumber * 2 - 1;
		const secondVariantId = containerNumber * 2;
		const variantsLabels = ['A', 'B', 'C', 'D'];
		return (
			<div className="button__container-item">
				{questionVariants.map(
					(variant) =>
						(variant.id === firstVariantId || variant.id === secondVariantId) && (
							<div
								className='button__wrapper'
								key={variant.id}
							>
								<button
									className={classNames(
										'button__item',
										'question__btn',
										getAnswerButtonClassName(variant.id)
									)}
									disabled={isDisabled}
									onClick={() => handleClick(variant.id)}
								>
									<span className="text--primary">{`${variantsLabels[variant.id - 1]}: `}</span>
									{variant.text}
								</button>
							</div>
						)
				)}
			</div>
		);
	};

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
					<ButtonsContainer containerNumber={1} />
					<ButtonsContainer containerNumber={2} />
				</div>
			</div>
		</div>
	);
};

export default GameWindow;
