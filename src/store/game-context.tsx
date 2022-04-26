import React from 'react';
import { IVariants, QuestionDifficult, TAnswerNumbers } from '../data/questions';

enum WindowState {
	start = '/',
	game = '/game',
	end = '/end',
}

enum ResultGame {
	default = 'default',
	win = 'win',
	lose = 'lose',
	expired = 'expired',
}

enum HintsType {
	fiftyAvailable = 'fiftyAvailable',
	callAvailable = 'callAvailable',
	viewersAvailable = 'viewersAvailable',
}

type THintsType = {
	[key in HintsType]: boolean;
};

type TViewerHint = {
	[key in TAnswerNumbers]: number;
};

const defaultViewerHint = {
	1: 0,
	2: 0,
	3: 0,
	4: 0,
};

interface IGameContext {
	windowState: WindowState;
	resultGame: string;
	difficult: QuestionDifficult;
	switchWindow: (state: WindowState) => void;
	setResultGame: (resultGame: ResultGame) => void;
	questionNumber: number;
	questionText: string;
	questionVariants: IVariants[];
	questionId: number;
	gameMove: (index: number, secondsLeft: number) => void;
	clearStates: () => void;
	availableHints: THintsType;
	changeAvailableHints: (name: HintsType) => void;
	fiftyHint: boolean;
	switchFiftyHint: (status: boolean) => void;
	callHint: string;
	switchCallHint: (status: string) => void;
	viewerHint: TViewerHint;
	switchViewerHint: (status: TViewerHint) => void;
	score: number;
	rightAnswer: number | undefined;
}

const value: IGameContext = {
	windowState: WindowState.start,
	resultGame: ResultGame.default,
	difficult: QuestionDifficult.easy,
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
		[HintsType.viewersAvailable]: false,
	},
	changeAvailableHints: () => {},
	fiftyHint: false,
	switchFiftyHint: () => {},
	callHint: '',
	switchCallHint: () => {},
	viewerHint: defaultViewerHint,
	switchViewerHint: () => {},
	score: 0,
	rightAnswer: undefined,
};

const GameContext: React.Context<IGameContext> = React.createContext(value);
GameContext.displayName = 'GameContext';

export { WindowState, ResultGame, GameContext, HintsType, defaultViewerHint };
export type { IGameContext, THintsType, TViewerHint };
