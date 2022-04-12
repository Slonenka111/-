import React, { useCallback, useMemo, useState } from "react";
import { QuestionDifficult } from "../../data/questions";
import { GameContext, IGameContext } from "../../store/game-context";
import { checkAnswer, getRandomQuestion } from "../questions";

const passQuestions: number[] = [];

const GameContextWrapper: React.FC = ({ children }) => {
	const [isGame, setIsGame] = useState(false);
	const [questionNumber, setQuestionNumber] = useState(0);
	// const [passQuestions, setPassQuestions] = useState<number[]>([]);
	const [difficult, setDifficult] = useState(QuestionDifficult.easy);
	const [[questionText, questionVariants, questionId], setQuestion] = useState(getRandomQuestion(difficult, passQuestions));

	const toggleGameState = useCallback(() => {
		setIsGame(prevState => !prevState);
	}, [setIsGame]);

	// const addQuestionNumber = useCallback(() => {
	// 	setQuestionNumber(questionNumber + 1);
	// }, [questionNumber]);

	// const completeQuestions = useCallback((id: number) => {
	// 	setPassQuestions([...passQuestions, id]);
	// }, [passQuestions]);

	// const approvedAnswer = useCallback((questionId: number, index: number) => {
	// 	return checkAnswer(questionId, index);
	// }, []);

	// const changeDifficult = useCallback(() => {
	// 	setDifficult(questionNumber < 4 ?
	// 		QuestionDifficult.easy : questionNumber < 9 ?
	// 			QuestionDifficult.medium : QuestionDifficult.hard);
	// }, [questionNumber]);

	// const getQuestion = useCallback(() => {
	// 	setQuestion(getRandomQuestion(difficult, passQuestions));
	// }, [difficult, passQuestions]);

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
		// addQuestionNumber,
		// completeQuestions,
		// changeDifficult,
		// getQuestion,
		questionText,
		questionVariants,
		questionId,
		// approvedAnswer,
		gameMove
		// clearStates
	}), [
		toggleGameState,
		// addQuestionNumber,
		// completeQuestions,
		// changeDifficult,
		// getQuestion,
		questionText,
		questionVariants,
		questionId,
		// approvedAnswer,
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
