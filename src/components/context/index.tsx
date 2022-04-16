import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IVariants, QuestionDifficult } from "../../data/questions";
import { GameContext, IGameContext, WindowState } from "../../store/game-context";
import { checkAnswer, getRandomQuestion } from "../questions";


let passQuestions: number[] = [];

const createGameStateString = (
	isGame: WindowState,
	questionNumber: number,
	difficult: QuestionDifficult,
	passQuestions: number[],
	questionText: string,
	questionVariants: IVariants[],
	questionId: number): string => {
	const gameState = {
		isGame: isGame,
		questionNumber: questionNumber,
		difficult: difficult,
		passQuestions: passQuestions,
		questionText: questionText,
		questionVariants: questionVariants,
		questionId: questionId
	};

	return JSON.stringify(gameState);
};

const switchWindow = (targetWindow: WindowState) => {
	window.location.pathname = targetWindow;
};

const GameContextWrapper: React.FC = ({ children }) => {
	const [isGame, setIsGame] = useState(WindowState.start);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [difficult, setDifficult] = useState(QuestionDifficult.easy);
	const [[questionText, questionVariants, questionId], setQuestion] = useState(() => {
			return getRandomQuestion(difficult, passQuestions);
		}
	);

	// Логика для первой отрисовки
	useEffect(() => {
		const gameState = JSON.parse(localStorage.getItem("GameState") as string);
		if (!gameState) {
			const newGameState = createGameStateString(isGame, questionNumber, difficult, passQuestions, questionText, questionVariants, questionId);
			localStorage.setItem("GameState", newGameState);
			switchWindow(WindowState.start);
		} else {
			setIsGame(gameState.isGame);
			setQuestionNumber(gameState.questionNumber);
			setDifficult(gameState.difficult);
			passQuestions = gameState.passQuestions;
			setQuestion([gameState.questionText, gameState.questionVariants, gameState.questionId]);
		}
		console.log(1);
	}, []);

	// Логика для игры
	useEffect(() => {
		const gameState = JSON.parse(localStorage.getItem("GameState") as string);
		if (gameState) {
			const newGameState = createGameStateString(isGame, questionNumber, difficult, passQuestions, questionText, questionVariants, questionId);
			localStorage.setItem("GameState", newGameState);
		}
		console.log("localStorage");

	}, [isGame, questionNumber, difficult, questionText, questionVariants, questionId]);


	const toggleGameState = useCallback((windowState: WindowState) => {
		setIsGame(windowState);
	}, [setIsGame]);

	const gameMove = useCallback(
		(index: number) => {
			const isRight = checkAnswer(questionId, index);

			// Обработка не верного ответа - проигрыша
			if (!isRight) {
				console.log("LOSE");
				toggleGameState(WindowState.end);
				switchWindow(WindowState.end)
				return;
			}

			// Обработка верного ответа на 15-й вопрос - победа
			if (questionNumber === 14) {
				console.log("WIN");
				toggleGameState(WindowState.end);
				switchWindow(WindowState.end)
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
			setQuestion(prev => getRandomQuestion(difficult, passQuestions));
		},
		[questionNumber, questionId, difficult, toggleGameState]
	);

	// const clearStates = () => {
	// 	setIsGame(false);
	// 	setQuestionNumber(0);
	// 	setPassQuestions([]);
	// };

	const value = useMemo<IGameContext>(
		() => ({
			toggleGameState,
			questionNumber,
			questionText,
			questionVariants,
			questionId,
			gameMove
			// clearStates
		}),
		[
			toggleGameState,
			questionNumber,
			questionText,
			questionVariants,
			questionId,
			gameMove
			// clearStates
		]
	);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameContextWrapper;
