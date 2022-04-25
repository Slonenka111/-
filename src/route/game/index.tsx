import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GameContext, ResultGame, WindowState, HintsType } from '../../store/game-context';
import Timer from '../../components/Timer/Timer';
import { LevelRoadmap } from '../../components/LevelRoadmap/LevelRoadmap';
import { getCallHint } from '../../components/questions';
import { Hints } from '../../components/Hints';
import { CallHint } from '../../components/CallHint';
import { IVariants } from '../../data/questions';
import classNames from 'classnames';
import '../../components/questions/style.scss';
import './style.scss';

const SECONDS_TO_ANSWER = 30;

enum AnswerStatuses {
	NoAnswer = 'no-answer',
	Pending = 'pending',
	Wrong = 'wrong',
	Correct = 'correct',
}

const GameWindow: React.FC = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [isPaused, setPaused] = useState(false);
	const [answer, setAnswer] = useState<undefined | number>(undefined);
	const [answerStatus, setAnswerStatus] = useState(AnswerStatuses.NoAnswer);
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
		changeAvailableHints,
		fiftyHint,
		switchFiftyHint,
		callHint,
		switchCallHint,
	} = useContext(GameContext);

	useEffect(() => {
		return () => {
			setAnswerStatus(AnswerStatuses.NoAnswer);
			setAnswer(undefined);
			setIsDisabled(false);
			setPaused(false);
		};
	}, [questionId]);

	useEffect(() => {
		switchFiftyHint(false);
		switchCallHint('');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionNumber]);

	const handleClickAvailableHints = useCallback(
		(name: HintsType) => {
			switch (name as HintsType) {
				case HintsType.fiftyAvailable:
					switchFiftyHint(true);
					break;
				case HintsType.callAvailable:
					switchCallHint(getCallHint(questionId, fiftyHint));
					break;
				case HintsType.viewersAvailable:
					console.log('viewersAvailable');
					break;
				default:
					console.error('Получен неизвестный тип подсказки');
			}
			changeAvailableHints(name);
		},
		[changeAvailableHints, fiftyHint, questionId, switchCallHint, switchFiftyHint]
	);

	const getAnswerButtonClassName = (index: number): string => {
		if (index === answer) return answerStatus;
		if (answerStatus === AnswerStatuses.Wrong && index === rightAnswer)
			return AnswerStatuses.Correct;
		return 'basic';
	};

	const handleClick = (index: number) => {
		setPaused(true);
		setIsDisabled(true);
		setAnswer(index);
		setAnswerStatus(AnswerStatuses.Pending);
		setTimeout(() => {
			index === rightAnswer
				? setAnswerStatus(AnswerStatuses.Correct)
				: setAnswerStatus(AnswerStatuses.Wrong);
			setTimeout(() => {
				gameMove(index, secondsLeftAfterAnswer.current);
			}, 3000);
		}, 2000);
	};

	const handleTimeExpiration = useCallback(() => {
		setIsDisabled(true);
		setTimeout(() => {
			setAnswerStatus(AnswerStatuses.Wrong);
			setTimeout(() => {
				switchWindow(WindowState.end);
				setResultGame(ResultGame.expired);
			}, 3000);
		}, 2000);
	}, [setResultGame, switchWindow]);

	return (
		<div className="game-window container">
			{callHint && <CallHint />}
			<div className="game-window__header">
				<div className="game-window__header--side">
					<Hints handleClick={handleClickAvailableHints} />
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
					<ButtonsContainer
						{...{
							getAnswerButtonClassName,
							isDisabled,
							onButtonClick: handleClick,
							questionVariants: questionVariants.slice(0, 2),
							fiftyHint: fiftyHint,
						}}
					/>
					<ButtonsContainer
						{...{
							getAnswerButtonClassName,
							isDisabled,
							onButtonClick: handleClick,
							questionVariants: questionVariants.slice(2),
							fiftyHint: fiftyHint,
						}}
					/>
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
	fiftyHint: boolean;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = (props) => {
	const { questionVariants, isDisabled, getAnswerButtonClassName, onButtonClick, fiftyHint } =
		props;
	const variantIdToLabel = Object.freeze({ 1: 'A', 2: 'B', 3: 'C', 4: 'D' });

	return (
		<div className="button__container-item">
			{questionVariants.map((variant) => (
				<div
					className={classNames('button__wrapper', {
						disabled: isDisabled,
						'disable-fogging': isDisabled && getAnswerButtonClassName(variant.id) === 'basic',
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
								'disable-fogging': isDisabled && getAnswerButtonClassName(variant.id) === 'basic',
							}
						)}
						disabled={isDisabled || (fiftyHint && !variant.fiftyHint)}
						onClick={() => onButtonClick(variant.id)}
					>
						{(!fiftyHint || variant.fiftyHint) && (
							<>
								<span className="text--primary">{`${variantIdToLabel[variant.id]}: `}</span>
								{variant.text}
							</>
						)}
					</button>
				</div>
			))}
		</div>
	);
};

export { GameWindow };
