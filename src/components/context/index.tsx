import React, { useCallback, useMemo, useState } from "react";
import { QuestionDifficult } from "../../data/questions";
import { GameContext, IGameContext } from "../../store/game-context";
import { getRandomQuestion, checkAnswer } from "../questions";

const GameContextWrapper: React.FC = ({ children }) => {

	const [isGame, setIsGame] = useState(false);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [passQuestions, setPassQuestions] = useState<number[]>([]);
	const [difficult, setDifficult] = useState(QuestionDifficult.easy);
	const [[questionText, questionVariants, questionId], setQuestion] = useState(getRandomQuestion(difficult, passQuestions));

	const toggleGameState = useCallback(() => {
		setIsGame(prevState => !prevState);
	}, [setIsGame]);

	const addQuestionNumber = useCallback(() => {
		setQuestionNumber(questionNumber + 1);
	}, [questionNumber]);

	const completeQuestions = useCallback((id: number) => {
		setPassQuestions([...passQuestions, id]);
	}, [passQuestions]);

	const approvedAnswer = useCallback((questionId: number, index: number) => {
		return checkAnswer(questionId, index);
	}, []);

	const changeDifficult = useCallback(() => {
		setDifficult(questionNumber < 4 ?
			QuestionDifficult.easy : questionNumber < 9 ?
				QuestionDifficult.medium : QuestionDifficult.hard);
	}, [questionNumber]);

	const getQuestion = useCallback(() => {
		setQuestion(getRandomQuestion(difficult, passQuestions));
	}, [difficult, passQuestions]);

	// const clearStates = () => {
	// 	setIsGame(false);
	// 	setQuestionNumber(0);
	// 	setPassQuestions([]);
	// };

	const value = useMemo<IGameContext>(() => ({
		toggleGameState,
		addQuestionNumber,
		completeQuestions,
		changeDifficult,
		getQuestion,
		questionText,
		questionVariants,
		questionId,
		approvedAnswer
		// clearStates
	}), [
		toggleGameState,
		addQuestionNumber,
		completeQuestions,
		changeDifficult,
		getQuestion,
		questionText,
		questionVariants,
		questionId,
		approvedAnswer
		// clearStates
	]);

	return (
		<GameContext.Provider value={value}>
			{children}
		</GameContext.Provider>
	);
};

export default GameContextWrapper;
