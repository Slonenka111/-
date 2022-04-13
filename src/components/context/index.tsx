import React, { useCallback, useMemo, useState } from "react";
import { QuestionDifficult } from "../../data/questions";
import { GameContext, IGameContext } from "../../store/game-context";
import { checkAnswer, getRandomQuestion } from "../questions";

const passQuestions: number[] = [];

const GameContextWrapper: React.FC = ({ children }) => {
	const [isGame, setIsGame] = useState(false);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [difficult, setDifficult] = useState(QuestionDifficult.easy);
	const [[questionText, questionVariants, questionId], setQuestion] = useState(getRandomQuestion(difficult, passQuestions));

	const toggleGameState = useCallback(() => {
		setIsGame(prevState => !prevState);
	}, [setIsGame]);

	const gameMove = useCallback((index: number) => {
		const isRight = checkAnswer(questionId, index);

		// Обработка не верного ответа - проигрыша
		if (!isRight) {
			console.log("LOSE");
			toggleGameState();
			return;
		}

		// Обработка верного ответа на 15-й вопрос - победа
		if (questionNumber === 14) {
			console.log("WIN");
			toggleGameState();
			return;
		}

		// Обработка следующего шага
		setQuestionNumber(questionNumber + 1);
		passQuestions.push(questionId);
		setDifficult(passQuestions.length < 4 ? QuestionDifficult.easy :
			passQuestions.length < 9 ? QuestionDifficult.medium : QuestionDifficult.hard);
		setQuestion(getRandomQuestion(difficult, passQuestions));
	}, [questionNumber, questionId, difficult, toggleGameState]);

	// const clearStates = () => {
	// 	setIsGame(false);
	// 	setQuestionNumber(0);
	// 	setPassQuestions([]);
	// };

	const value = useMemo<IGameContext>(() => ({
		toggleGameState,
		questionText,
		questionVariants,
		questionId,
		gameMove
		// clearStates
	}), [
		toggleGameState,
		questionText,
		questionVariants,
		questionId,
		gameMove
		// clearStates
	]);

	return (
		<GameContext.Provider value={value}>
			{children}
		</GameContext.Provider>
	);
};

export default GameContextWrapper;
