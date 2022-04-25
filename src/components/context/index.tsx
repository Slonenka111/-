import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { QuestionDifficult } from '../../data/questions';
import {
	GameContext,
	IGameContext,
	WindowState,
	ResultGame,
	THintsType,
	HintsType,
} from '../../store/game-context';
import { getQuestionById, getRandomQuestion, getRightAnswer } from '../questions';
import { useNavigate } from 'react-router-dom';

let passQuestions: number[] = [];

const createGameStateString = (
	windowState: WindowState,
	resultGame: ResultGame,
	questionNumber: number,
	difficult: QuestionDifficult,
	passQuestions: number[],
	questionId: number,
	score: number,
	availableHints: THintsType,
	fiftyHint: boolean,
	callHint: string
): string | undefined => {
	const gameState = {
		windowState: windowState,
		resultGame: resultGame,
		questionNumber: questionNumber,
		difficult: difficult,
		passQuestions: passQuestions,
		questionId: questionId,
		score: score,
		availableHints: availableHints,
		fiftyHint: fiftyHint,
		callHint: callHint,
	};

	try {
		return JSON.stringify(gameState);
	} catch (e) {
		console.error(e);
	}
};

const GameContextWrapper: React.FC = ({ children }) => {
	const [windowState, setWindowState] = useState(WindowState.start);
	const [resultGame, setResultGame] = useState(ResultGame.default);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [difficult, setDifficult] = useState(QuestionDifficult.easy);
	const [[questionText, questionVariants, questionId], setQuestion] = useState(() => {
		return getRandomQuestion(difficult, passQuestions);
	});
	const [score, setScore] = useState(0);
	const [rightAnswer, setRightAnswer] = useState<undefined | number>(undefined);
	const [availableHints, setAvailableHints] = useState<THintsType>({
		[HintsType.fiftyAvailable]: false,
		[HintsType.callAvailable]: false,
		[HintsType.viewersAvailable]: false,
	});
	const [fiftyHint, setFiftyHint] = useState(false);
	const [callHint, setCallHint] = useState<string>('');

	const navigate = useNavigate();

	const switchWindow = useCallback(
		(targetWindow: WindowState) => {
			setWindowState(targetWindow);
			navigate(targetWindow);
		},
		[navigate]
	);

	// Логика для первой отрисовки
	useEffect(() => {
		let gameState;

		try {
			gameState = JSON.parse(localStorage.getItem('GameState') as string);
		} catch (e) {
			console.error(e);
		}

		if (!gameState) {
			const newGameState = createGameStateString(
				windowState,
				resultGame,
				questionNumber,
				difficult,
				passQuestions,
				questionId,
				score,
				availableHints,
				fiftyHint,
				callHint
			);
			if (newGameState) localStorage.setItem('GameState', newGameState);
			switchWindow(WindowState.start);
		} else {
			switchWindow(gameState.windowState);
			setResultGame(gameState.resultGame);
			setQuestionNumber(gameState.questionNumber);
			setDifficult(gameState.difficult);
			passQuestions = gameState.passQuestions;
			setQuestion(getQuestionById(gameState.questionId));
			setScore(gameState.score);
			setAvailableHints(gameState.availableHints);
			setFiftyHint(gameState.fiftyHint);
			setCallHint(gameState.callHint);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Логика для игры
	useEffect(() => {
		const newGameState = createGameStateString(
			windowState,
			resultGame,
			questionNumber,
			difficult,
			passQuestions,
			questionId,
			score,
			availableHints,
			fiftyHint,
			callHint
		);
		if (newGameState) localStorage.setItem('GameState', newGameState);
	}, [
		windowState,
		resultGame,
		questionNumber,
		difficult,
		questionId,
		score,
		availableHints,
		fiftyHint,
		callHint,
	]);

	useEffect(() => {
		setRightAnswer(getRightAnswer(questionId));
	}, [questionId]);

	const gameMove = useCallback(
		(index, secondsLeft) => {
			// Обработка не верного ответа - проигрыша
			if (index !== rightAnswer) {
				console.log('LOSE');
				switchWindow(WindowState.end);
				setResultGame(ResultGame.lose);
				return;
			}

			setScore((prev) => prev + 10 + secondsLeft);

			// Обработка верного ответа на 15-й вопрос - победа
			if (questionNumber === 14) {
				console.log('WIN');
				switchWindow(WindowState.end);
				setResultGame(ResultGame.win);
				return;
			}

			// Обработка следующего шага
			setQuestionNumber((prev) => prev + 1);
			passQuestions.push(questionId);
			setDifficult(
				passQuestions.length < 4
					? QuestionDifficult.easy
					: passQuestions.length < 9
					? QuestionDifficult.medium
					: QuestionDifficult.hard
			);
			setQuestion(getRandomQuestion(difficult, passQuestions));
		},
		[rightAnswer, questionNumber, questionId, difficult, switchWindow]
	);

	const clearStates = useCallback(() => {
		switchWindow(WindowState.game);
		setResultGame(ResultGame.default);
		setQuestionNumber(0);
		passQuestions = [];
		setDifficult(QuestionDifficult.easy);
		setQuestion(getRandomQuestion(QuestionDifficult.easy, passQuestions));
		setScore(0);
		setAvailableHints({
			[HintsType.fiftyAvailable]: false,
			[HintsType.callAvailable]: false,
			[HintsType.viewersAvailable]: false,
		});
	}, [switchWindow]);

	const changeAvailableHints = useCallback((name: HintsType) => {
		setAvailableHints((prevState) => ({ ...prevState, [name]: true }));
	}, []);

	const switchFiftyHint = useCallback((status: boolean) => {
		setFiftyHint(status);
	}, []);

	const switchCallHint = useCallback((status: string) => {
		setCallHint(status);
	}, []);

	const value = useMemo<IGameContext>(
		() => ({
			windowState,
			resultGame,
			switchWindow,
			setResultGame,
			questionNumber,
			questionText,
			questionVariants,
			questionId,
			gameMove,
			score,
			clearStates,
			availableHints,
			changeAvailableHints,
			fiftyHint,
			switchFiftyHint,
			callHint,
			switchCallHint,
			rightAnswer,
		}),
		[
			windowState,
			resultGame,
			switchWindow,
			setResultGame,
			questionNumber,
			questionText,
			questionVariants,
			questionId,
			gameMove,
			score,
			clearStates,
			availableHints,
			changeAvailableHints,
			fiftyHint,
			switchFiftyHint,
			callHint,
			switchCallHint,
			rightAnswer,
		]
	);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContextWrapper, ResultGame };
