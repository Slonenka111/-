import React from "react";

export interface IGameContext {
	toggleGameState: () => void;
	addQuestionNumber: () => void;
	completeQuestions: (num: number) => void;
	passQuestions: number[];
	clearStates: () => void;
}

export const value: IGameContext = {
	toggleGameState: () => {},
	addQuestionNumber: () => {},
	completeQuestions: () => {},
	passQuestions: [],
	clearStates: () => {},
}

export const GameContext: React.Context<IGameContext> = React.createContext(value);
GameContext.displayName = 'GameContext';


