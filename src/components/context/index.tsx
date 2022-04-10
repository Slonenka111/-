import React, { useCallback, useMemo, useState } from "react";
import { GameContext , IGameContext} from "../../store/game-context";

const GameContextWrapper: React.FC = ({ children }) => {


	const [isGame, setIsGame] = useState(false);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [passQuestions, setPassQuestions] = useState<number[]>([]);

	const toggleGameState = useCallback(() => {
		setIsGame(prevState => !prevState);
	},[setIsGame]);

	const addQuestionNumber = useCallback(() => {
		setQuestionNumber(questionNumber + 1);
	}, [questionNumber]);

	const completeQuestions = useCallback( (id: number) => {
		setPassQuestions([...passQuestions, id]);
	}, [passQuestions]);


	const clearStates = () => {
		setIsGame(false);
		setQuestionNumber(0);
		setPassQuestions([]);
	};

	const value = useMemo<IGameContext>(() => ({
		toggleGameState,
		addQuestionNumber,
		completeQuestions,
		passQuestions,
		clearStates
	}), [
		toggleGameState,
		addQuestionNumber,
		completeQuestions,
		passQuestions,
		clearStates
	]);

	return (
		<GameContext.Provider value={value}>
			{children}
		</GameContext.Provider>
	);
};

export default GameContextWrapper;
