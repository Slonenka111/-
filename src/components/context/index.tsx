import React, { useCallback, useMemo, useState } from 'react';
import { QuestionDifficult } from '../../data/questions';
import { GameContext, IGameContext } from '../../store/game-context';
import { checkAnswer, getRandomQuestion } from '../questions';

const passQuestions: number[] = [];

const GameContextWrapper: React.FC = ({ children }) => {
	const [windowState, setWindowState] = useState(false);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [difficult, setDifficult] = useState(QuestionDifficult.easy);
	const [[questionText, questionVariants, questionId], setQuestion] = useState(
		getRandomQuestion(difficult, passQuestions)
	);
	const [score, setScore] = useState(0);

	const toggleGameState = useCallback(() => {
		setWindowState((prevState) => !prevState);
	}, [setWindowState]);

	const gameMove = useCallback(
		(index: number, secondsLeft: number) => {
			const isRight = checkAnswer(questionId, index);

			// Обработка не верного ответа - проигрыша
			if (!isRight) {
				console.log('LOSE');
				toggleGameState();
				return;
			}

			setScore((prev) => prev + 10 + secondsLeft);

			// Обработка верного ответа на 15-й вопрос - победа
			if (questionNumber === 14) {
				console.log('WIN');
				toggleGameState();
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
		[questionNumber, questionId, difficult, toggleGameState]
	);

	// const clearStates = () => {
	// 	setWindowState(false);
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
			gameMove,
			score,
			// clearStates
		}),
		[
			toggleGameState,
			questionNumber,
			questionText,
			questionVariants,
			questionId,
			gameMove,
			score,
			// clearStates
		]
	);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameContextWrapper;
