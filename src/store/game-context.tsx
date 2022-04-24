import React from 'react';
import { IVariants } from '../data/questions';

enum WindowState {
	start = '/',
	game = '/game',
	end = '/end',
}

enum ResultGame {
	default = 'default',
	win = 'win',
	lose = 'lose',
}

enum HintsType {
	fiftyAvailable = "fiftyAvailable",
	callAvailable = "callAvailable",
	viewersAvailable = "viewersAvailable"
}

type THintsType = {
	[key in HintsType]: boolean
}

interface IGameContext {
	windowState: WindowState;
	resultGame: string;
	switchWindow: (state: WindowState) => void;
	setResultGame: (resultGame: ResultGame) => void;
	questionNumber: number;
	questionText: string;
	questionVariants: IVariants[];
	questionId: number;
	gameMove: (isAnswerRight: boolean, secondsLeft: number) => void;
	clearStates: () => void;
	availableHints: THintsType;
	changeAvailableHints: (name: HintsType)=> void;
	fiftyHint: boolean;
	switchFiftyHint: (status: boolean)=> void;
	callHint: boolean;
	switchCallHint: (status: boolean) => void;
	score: number;
}

const value: IGameContext = {
	windowState: WindowState.start,
	resultGame: ResultGame.default,
	switchWindow: () => {},
	setResultGame: () => {},
	questionNumber: 0,
	questionText: '',
	questionVariants: [],
	questionId: 0,
	gameMove: () => {},
	clearStates: () => {},
	availableHints: {
		[HintsType.fiftyAvailable]: false,
		[HintsType.callAvailable]: false,
		[HintsType.viewersAvailable]: false
	},
	changeAvailableHints: ()=>{},
	fiftyHint: false,
	switchFiftyHint: ()=> {},
	callHint: false,
	switchCallHint: ()=>{},
	score: 0,
};

const GameContext: React.Context<IGameContext> = React.createContext(value);
GameContext.displayName = 'GameContext';

export { WindowState, ResultGame, GameContext, HintsType};
export type { IGameContext, THintsType };
