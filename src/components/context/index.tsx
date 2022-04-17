import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IVariants, QuestionDifficult } from "../../data/questions";
import { GameContext, IGameContext, WindowState } from "../../store/game-context";
import { checkAnswer, getRandomQuestion } from "../questions";
import { useNavigate } from "react-router-dom";

let passQuestions: number[] = [];

const createGameStateString = (
	windowState: WindowState,
	questionNumber: number,
	difficult: QuestionDifficult,
	passQuestions: number[],
	questionText: string,
	questionVariants: IVariants[],
	questionId: number): string => {
	const gameState = {
		windowState: windowState,
		questionNumber: questionNumber,
		difficult: difficult,
		passQuestions: passQuestions,
		questionText: questionText,
		questionVariants: questionVariants,
		questionId: questionId
	};

	return JSON.stringify(gameState);
};

const GameContextWrapper: React.FC = ({ children }) => {
	const [windowState, setWindowState] = useState(WindowState.start);
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
			const newGameState = createGameStateString(windowState, questionNumber, difficult, passQuestions, questionText, questionVariants, questionId);
			localStorage.setItem("GameState", newGameState);
			switchWindow(WindowState.start);
		} else {
			switchWindow(gameState.windowState);
			setQuestionNumber(gameState.questionNumber);
			setDifficult(gameState.difficult);
			passQuestions = gameState.passQuestions;
			setQuestion([gameState.questionText, gameState.questionVariants, gameState.questionId]);
		}
	}, []);

	// Логика для игры
	useEffect(() => {
		const gameState = JSON.parse(localStorage.getItem("GameState") as string);
		if (gameState) {
			const newGameState = createGameStateString(windowState, questionNumber, difficult, passQuestions, questionText, questionVariants, questionId);
			localStorage.setItem("GameState", newGameState);
		}
	}, [windowState, questionNumber, difficult, questionText, questionVariants, questionId]);

	const gameMove = useCallback(
		(index: number) => {
			const isRight = checkAnswer(questionId, index);

			// Обработка не верного ответа - проигрыша
			if (!isRight) {
				console.log("LOSE");
				switchWindow(WindowState.end);
				return;
			}

			// Обработка верного ответа на 15-й вопрос - победа
			if (questionNumber === 14) {
				console.log("WIN");
				switchWindow(WindowState.end);
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
		setQuestionNumber(0);
		passQuestions = [];
	}, [switchWindow]);

	const value = useMemo<IGameContext>(
		() => ({
			windowState,
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

export default GameContextWrapper;
