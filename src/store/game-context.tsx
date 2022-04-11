import React from "react";
import { IVariants } from "../data/questions";
import { checkAnswer } from "../components/questions";

export interface IGameContext {
	toggleGameState: () => void;
	addQuestionNumber: () => void;
	completeQuestions: (num: number) => void;
	changeDifficult: () => void;
	getQuestion: () => void;
	questionText: string;
	questionVariants: IVariants[];
	questionId: number,
	approvedAnswer?: (questionId: number, index: number) => boolean | undefined;
	clearStates?: () => void;
}

export const value: IGameContext = {
	toggleGameState: () => {},
	addQuestionNumber: () => {},
	completeQuestions: () => {},
	changeDifficult: () => {},
	getQuestion: () => {},
	questionText: '',
	questionVariants: [],
	questionId: 0,
	approvedAnswer: (questionId, index) => {
		return checkAnswer(questionId, index);
	},
	clearStates: () => {},
}

export const GameContext: React.Context<IGameContext> = React.createContext(value);
GameContext.displayName = 'GameContext';


