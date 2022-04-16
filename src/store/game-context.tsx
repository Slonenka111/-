import React from "react";
import { IVariants } from "../data/questions";

enum WindowState {
	start = "/",
	game = "/game",
	end = "/end",
}

interface IGameContext {
	toggleGameState: (state: WindowState) => void;
	questionNumber: number;
	questionText: string;
	questionVariants: IVariants[];
	questionId: number;
	gameMove: (index: number) => void;
	clearStates?: () => void;
}

const value: IGameContext = {
	toggleGameState: () => {
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
	WindowState, GameContext
};
export type { IGameContext };

