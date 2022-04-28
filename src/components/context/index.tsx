import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { QuestionDifficult } from '../../data/questions';
import {
	defaultAvailableHint,
	defaultViewerHint,
	GameContext,
	HintsType,
	IGameContext,
	ResultGame,
	THintsType,
	TViewerHint,
	WindowState,
} from '../../store/game-context';
import { getQuestionById, getRandomQuestion, getRightAnswer } from '../questions';
import { useNavigate } from 'react-router-dom';
import { TIMER_STATE_KEY } from '../../components/Timer/Timer';

let passQuestions: number[] = [];

const LOCAL_STORAGE_KEY = {
	GAME_STATE: 'GameState',
};

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
	callHint: string | undefined,
	viewerHint: TViewerHint | undefined
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
		viewerHint: viewerHint,
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
	const [availableHints, setAvailableHints] = useState<THintsType>(defaultAvailableHint);
	const [fiftyHint, setFiftyHint] = useState<boolean>(false);
	const [callHint, setCallHint] = useState<string | undefined>('');
	const [viewerHint, setViewerHint] = useState<TViewerHint | undefined>(defaultViewerHint);

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
			gameState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.GAME_STATE) as string);
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
				callHint,
				viewerHint
			);

			if (newGameState) {
				localStorage.setItem(LOCAL_STORAGE_KEY.GAME_STATE, newGameState);
			}

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
			setViewerHint(gameState.viewerHint);
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
			callHint,
			viewerHint
		);
		if (newGameState) {
			localStorage.setItem(LOCAL_STORAGE_KEY.GAME_STATE, newGameState);
		}
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
		viewerHint,
	]);

	useEffect(() => {
		setRightAnswer(getRightAnswer(questionId));
	}, [questionId]);

	const gameMove = useCallback(
		(index, secondsLeft) => {
			localStorage.removeItem(TIMER_STATE_KEY);
			// Обработка не верного ответа - проигрыша
			if (index !== rightAnswer) {
				switchWindow(WindowState.end);
				setResultGame(ResultGame.lose);
				return;
			}

			setScore((prev) => prev + 10 + secondsLeft);

			// Обработка верного ответа на 15-й вопрос - победа
			if (questionNumber === 14) {
				setQuestionNumber((prev) => prev + 1);
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
		localStorage.removeItem(TIMER_STATE_KEY);
		switchWindow(WindowState.game);
		setResultGame(ResultGame.default);
		setQuestionNumber(0);
		passQuestions = [];
		setDifficult(QuestionDifficult.easy);
		setQuestion(getRandomQuestion(QuestionDifficult.easy, passQuestions));
		setScore(0);
		setAvailableHints(defaultAvailableHint);
	}, [switchWindow]);

	const changeAvailableHints = useCallback((name: HintsType) => {
		setAvailableHints((prevState) => ({ ...prevState, [name]: true }));
	}, []);

	const switchFiftyHint = useCallback((status: boolean) => {
		setFiftyHint(status);
	}, []);

	const switchCallHint = useCallback((status: string | undefined) => {
		if (status === undefined) {
			console.error('Не корректная подсказка звонка');
			return;
		}
		setCallHint(status);
	}, []);

	const switchViewerHint = useCallback((status: TViewerHint | undefined) => {
		if (status === undefined) {
			console.error('Не корректная подсказка зрителей');
			return;
		}
		setViewerHint(status);
	}, []);

	const value = useMemo<IGameContext>(
		() => ({
			windowState,
			resultGame,
			switchWindow,
			difficult,
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
			viewerHint,
			switchViewerHint,
			rightAnswer,
		}),
		[
			windowState,
			resultGame,
			switchWindow,
			difficult,
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
			viewerHint,
			switchViewerHint,
			rightAnswer,
		]
	);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContextWrapper, ResultGame };
