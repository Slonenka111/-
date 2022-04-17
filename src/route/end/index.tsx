import React, { useContext } from "react";
import { GameContext } from "../../store/game-context";

const EndWindow: React.FC = () => {

	const { clearStates } = useContext(GameContext);

	return (
		<div>
			Конец Игры
			<button onClick={clearStates}>
				Вернуться назад
			</button>
		</div>
	)
}

export default EndWindow
