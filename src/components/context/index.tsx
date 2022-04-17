import React, { useCallback, useEffect, useMemo, useState } from "react";
import { QuestionDifficult } from "../../data/questions";
import { GameContext, IGameContext, WindowState, ResultGame } from "../../store/game-context";
import { checkAnswer, getQuestionById, getRandomQuestion } from "../questions";
import { useNavigate } from "react-router-dom";

let passQuestions: number[] = [];

const createGameStateString = (
	windowState: WindowState,
	resultGame: ResultGame,
	questionNumber: number,
	difficult: QuestionDifficult,
	passQuestions: number[],
	questionId: number): string => {
	const gameState = {
		windowState: windowState,
		resultGame: resultGame,
		questionNumber: questionNumber,
		difficult: difficult,
		passQuestions: passQuestions,
		questionId: questionId
	};

	return JSON.stringify(gameState);
};

const GameContextWrapper: React.FC = ({ children }) => {
	const [windowState, setWindowState] = useState(WindowState.start);
	const [resultGame, setResultGame] = useState(ResultGame.default);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [difficult, setDifficult] = useState(QuestionDifficult.easy);
	const [[questionText, questionVariants, questionId], setQuestion] = useState(() => {
			return getRandomQuestion(difficult, passQuestions);
		}
	);

	const navigate = useNavigate();

	const switchWindow = useCallback((targetWindow: WindowState) => {
		setWindowState(targetWindow);
		navigate(targetWindow);
	}, [navigate]);

	// Логика для первой отрисовки
	useEffect(() => {
		const gameState = JSON.parse(localStorage.getItem("GameState") as string);
		if (!gameState) {
			const newGameState = createGameStateString(windowState, resultGame, questionNumber, difficult, passQuestions, questionId);
			localStorage.setItem("GameState", newGameState);
			switchWindow(WindowState.start);
		} else {
			switchWindow(gameState.windowState);
			setResultGame(gameState.resultGame);
			setQuestionNumber(gameState.questionNumber);
			setDifficult(gameState.difficult);
			passQuestions = gameState.passQuestions;
			setQuestion(getQuestionById(gameState.questionId));
		}
	}, []);

	// Логика для игры
	useEffect(() => {
		const gameState = JSON.parse(localStorage.getItem("GameState") as string);
		if (gameState) {
			const newGameState = createGameStateString(windowState, resultGame, questionNumber, difficult, passQuestions, questionId);
			localStorage.setItem("GameState", newGameState);
		}
	}, [windowState, resultGame, questionNumber, difficult, questionId]);

	const gameMove = useCallback(
		(index: number) => {
			const isRight = checkAnswer(questionId, index);

			// Обработка не верного ответа - проигрыша
			if (!isRight) {
				console.log("LOSE");
				switchWindow(WindowState.end);
				setResultGame(ResultGame.lose);
				return;
			}

			// Обработка верного ответа на 15-й вопрос - победа
			if (questionNumber === 14) {
				console.log("WIN");
				switchWindow(WindowState.end);
				setResultGame(ResultGame.win);
				return;
			}

			// Обработка следующего шага
			setQuestionNumber(questionNumber + 1);
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
		[questionId, questionNumber, difficult, switchWindow]
	);

	const clearStates = useCallback(() => {
		switchWindow(WindowState.start);
		setResultGame(ResultGame.default);
		setQuestionNumber(0);
		passQuestions = [];
		setDifficult(QuestionDifficult.easy);
		setQuestion(getRandomQuestion(QuestionDifficult.easy, passQuestions));
	}, [switchWindow]);

	const value = useMemo<IGameContext>(
		() => ({
			windowState,
			resultGame,
			switchWindow,
			questionNumber,
			questionText,
			questionVariants,
			questionId,
			gameMove,
			clearStates
		}),
		[
			windowState,
			resultGame,
			switchWindow,
			questionNumber,
			questionText,
			questionVariants,
			questionId,
			gameMove,
			clearStates
		]
	);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export {
	GameContextWrapper,
	ResultGame
};
