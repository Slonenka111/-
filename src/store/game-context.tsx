import React from "react";
import { IVariants } from "../data/questions";

export interface IGameContext {
	toggleGameState: () => void;
	questionText: string;
	questionVariants: IVariants[];
	questionId: number,
	gameMove: (index: number) => void;
	clearStates?: () => void;
}

export const value: IGameContext = {
	toggleGameState: () => {},
	questionText: '',
	questionVariants: [],
	questionId: 0,
	gameMove: () => {},
	clearStates: () => {},
}

export const GameContext: React.Context<IGameContext> = React.createContext(value);
GameContext.displayName = 'GameContext';


