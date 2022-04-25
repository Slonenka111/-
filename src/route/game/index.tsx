import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import '../../components/questions/style.scss';
import { GameContext, ResultGame, WindowState } from '../../store/game-context';
import Timer from '../../components/Timer/Timer';
import { LevelRoadmap } from '../../components/LevelRoadmap/LevelRoadmap';
import './style.scss';
import classNames from 'classnames';
import { IVariants } from '../../data/questions';

const SECONDS_TO_ANSWER = 30;

enum AnswerStatus {
	NoAnswer = 'no-answer',
	Pending = 'pending',
	Wrong = 'wrong',
	Correct = 'correct',
}

const GameWindow: React.FC = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [isPaused, setPaused] = useState(false);
	const [answer, setAnswer] = useState<undefined | number>(undefined);
	const [answerStatus, setAnswerStatus] = useState(AnswerStatus.NoAnswer);
	const secondsLeftAfterAnswer = useRef(SECONDS_TO_ANSWER);

	const {
		questionNumber,
		questionText,
		questionVariants,
		gameMove,
		switchWindow,
		setResultGame,
		questionId,
		rightAnswer,
	} = useContext(GameContext);

	useEffect(() => {
		return () => {
			setAnswerStatus(AnswerStatus.NoAnswer);
			setAnswer(undefined);
			setIsDisabled(false);
			setPaused(false);
		};
	}, [questionId]);

	const getAnswerButtonClassName = (index: number): AnswerStatus => {
		if (index === answer) return answerStatus;
		if (answerStatus === AnswerStatus.Wrong && index === rightAnswer) return AnswerStatus.Correct;
		return AnswerStatus.NoAnswer;
	};

	const handleClick = (index: number) => {
		setPaused(true);
		setIsDisabled(true);
		setAnswer(index);
		setAnswerStatus(AnswerStatus.Pending);
		setTimeout(() => {
			index === rightAnswer
				? setAnswerStatus(AnswerStatus.Correct)
				: setAnswerStatus(AnswerStatus.Wrong);
			setTimeout(() => {
				gameMove(index, secondsLeftAfterAnswer.current);
			}, 3000);
		}, 2000);
	};

	const handleTimeExpiration = useCallback(() => {
		setIsDisabled(true);
		setTimeout(() => {
			setAnswerStatus(AnswerStatus.Wrong);
			setTimeout(() => {
				switchWindow(WindowState.end);
				setResultGame(ResultGame.expired);
			}, 3000);
		}, 2000);
	}, [setResultGame, switchWindow]);

	const getButtonsContainerProps = (questionVariants: IVariants[]): ButtonsContainerProps => {
		return {
			getAnswerButtonClassName,
			isDisabled,
			onButtonClick: handleClick,
			questionVariants: questionVariants,
		};
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
					<ButtonsContainer {...getButtonsContainerProps(questionVariants.slice(0, 2))} />
					<ButtonsContainer {...getButtonsContainerProps(questionVariants.slice(2))} />
				</div>
			</div>
		</div>
	);
};

interface ButtonsContainerProps {
	questionVariants: IVariants[];
	isDisabled: boolean;
	getAnswerButtonClassName: (variantId: number) => string;
	onButtonClick: (variantId: number) => void;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = (props) => {
	const { questionVariants, isDisabled, getAnswerButtonClassName, onButtonClick } = props;
	const variantIdToLabel = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' };
	return (
		<div className="button__container-item">
			{questionVariants.map((variant) => (
				<div
					className={classNames('button__wrapper', {
						disabled: isDisabled,
						'disable-fogging':
							isDisabled && getAnswerButtonClassName(variant.id) === AnswerStatus.NoAnswer,
					})}
					key={variant.id}
				>
					<button
						className={classNames(
							'button__item',
							'question__btn',
							getAnswerButtonClassName(variant.id),
							{
								disabled: isDisabled,
								'disable-fogging':
									isDisabled && getAnswerButtonClassName(variant.id) === AnswerStatus.NoAnswer,
							}
						)}
						disabled={isDisabled}
						onClick={() => onButtonClick(variant.id)}
					>
						<span className="text--primary">{`${variantIdToLabel[variant.id]}: `}</span>
						{variant.text}
					</button>
				</div>
			))}
		</div>
	);
};

export default GameWindow;
