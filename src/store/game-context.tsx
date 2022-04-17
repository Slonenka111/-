import React from "react";
import { IVariants } from "../data/questions";

enum WindowState {
	start = "/",
	game = "/game",
	end = "/end",
}

enum ResultGame {
	win = "win",
	lose = "lose",
	default = "default"
}

interface IGameContext {
	windowState: WindowState;
	resultGame: string,
	switchWindow: (state: WindowState) => void;
	questionNumber: number;
	questionText: string;
	questionVariants: IVariants[];
	questionId: number;
	gameMove: (index: number) => void;
	clearStates: () => void;
}

const value: IGameContext = {
	windowState: WindowState.start,
	resultGame: ResultGame.default,
	switchWindow: () => {
	},
	questionNumber: 0,
	questionText: "",
	questionVariants: [],
	questionId: 0,
	gameMove: () => {
	},
	clearStates: () => {
	}
};

const GameContext: React.Context<IGameContext> = React.createContext(value);
GameContext.displayName = "GameContext";

export {
	WindowState, ResultGame, GameContext
};
export type { IGameContext };

