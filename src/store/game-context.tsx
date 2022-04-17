import React from 'react';
import { IVariants } from '../data/questions';

export interface IGameContext {
	toggleGameState: () => void;
	questionNumber: number;
	questionText: string;
	questionVariants: IVariants[];
	questionId: number;
	gameMove: (index: number, secondsLeft: number) => void;
	clearStates?: () => void;
	score: number;
}

export const value: IGameContext = {
	toggleGameState: () => {},
	questionNumber: 0,
	questionText: '',
	questionVariants: [],
	questionId: 0,
	gameMove: () => {},
	clearStates: () => {},
	score: 0,
};

export const GameContext: React.Context<IGameContext> = React.createContext(value);
GameContext.displayName = 'GameContext';
