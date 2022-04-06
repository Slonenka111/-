import React from "react";

interface IGameContext {
	isGame: boolean;
	setIsGame: (state: boolean) => void;
	questionNumber: number;
	setQuestionNumber: (state: number) => void;
}

export const value: IGameContext = {
	isGame: false,
	setIsGame: () => {
	},
	questionNumber: 0,
	setQuestionNumber: () => {
	}
}

export const GameContext: React.Context<IGameContext> = React.createContext(value);
GameContext.displayName = 'GameContext';


