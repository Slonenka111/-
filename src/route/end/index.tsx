import React, { useContext } from "react";
import { GameContext } from "../../store/game-context";
import { ResultGame } from "../../components/context";

const EndWindow: React.FC = () => {

	const { clearStates, resultGame } = useContext(GameContext);

	return (
		<div>
			{(resultGame === ResultGame.lose) &&
				<h1>Увы</h1>}

			{(resultGame === ResultGame.win) &&
				<h1>Ты победитель!</h1>}

			<div>Твой счет:</div>
			<div>Выигрыш:</div>

			<button onClick={clearStates}>
				Вернуться назад
			</button>
		</div>
	);
};

export default EndWindow;
