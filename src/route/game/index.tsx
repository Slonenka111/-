import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
	GameContext,
	ResultGame,
	WindowState,
	HintsType,
	TViewerHint,
	defaultViewerHint,
} from '../../store/game-context';
import Timer from '../../components/Timer/Timer';
import { LevelRoadmap } from '../../components/LevelRoadmap/LevelRoadmap';
import { getCallHint, getViewerHint } from '../../components/questions';
import { Hints } from '../../components/Hints';
import { CallHint } from '../../components/CallHint';
import { IVariants } from '../../data/questions';
import classNames from 'classnames';
import '../../components/questions/style.scss';
import './style.scss';

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
		difficult,
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
		viewerHint,
		switchViewerHint,
	} = useContext(GameContext);

	useEffect(() => {
		return () => {
			setAnswerStatus(AnswerStatus.NoAnswer);
			setAnswer(undefined);
			setIsDisabled(false);
			setPaused(false);
		};
	}, [questionId]);

	useEffect(() => {
		switchFiftyHint(false);
		switchCallHint('');
		switchViewerHint(defaultViewerHint);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionNumber]);

	// useEffect(() => {
	// 	if (fiftyHint && viewerHint !== defaultViewerHint) switchViewerHint(getViewerHint(questionId, difficult, fiftyHint));
	// }, [fiftyHint, viewerHint]);

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
					setPaused(true);
					switchViewerHint(getViewerHint(questionId, difficult, fiftyHint));
					setTimeout(() => {
						setPaused(false);
					}, 2000);
					break;
				default:
					console.error('Получен неизвестный тип подсказки');
			}
			changeAvailableHints(name);
		},
		[
			changeAvailableHints,
			difficult,
			fiftyHint,
			questionId,
			switchCallHint,
			switchFiftyHint,
			switchViewerHint,
		]
	);

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
			fiftyHint: fiftyHint,
			viewerHint: viewerHint,
		};
	};

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
	fiftyHint: boolean;
	viewerHint: TViewerHint;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = (props) => {
	const {
		questionVariants,
		isDisabled,
		getAnswerButtonClassName,
		onButtonClick,
		fiftyHint,
		viewerHint,
	} = props;
	const variantIdToLabel = Object.freeze({ 1: 'A', 2: 'B', 3: 'C', 4: 'D' });
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
							'button__item--viewers-result',
							'question__btn',
							getAnswerButtonClassName(variant.id),
							{
								disabled: isDisabled,
								'disable-fogging':
									isDisabled && getAnswerButtonClassName(variant.id) === AnswerStatus.NoAnswer,
							}
						)}
						disabled={isDisabled || (fiftyHint && !variant.fiftyHint)}
						onClick={() => onButtonClick(variant.id)}
						style={{
							'--viewers-vote': !(fiftyHint && !variant.fiftyHint) ? viewerHint[variant.id] : 0,
						}}
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
