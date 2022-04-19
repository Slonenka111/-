import React, { useCallback, useContext } from 'react';
import logo from '../../assets/images/logo.png';
import './start.scss';
import { GameContext, WindowState } from '../../store/game-context';

const StartWindow: React.FC = () => {
	return (
		<div>
			<h1>Кто хочет стать миллионером?</h1>
			<div className="rowContainer">
				<img alt="game logo" width={251} src={logo} />
			</div>
			<div className="rowContainer">
				<StartGameButton>Начать игру</StartGameButton>
			</div>
		</div>
	);
};

const StartGameButton: React.FC = (props) => {
	const { switchWindow } = useContext(GameContext);
	const handleClick = useCallback(() => {
		switchWindow(WindowState.game);
	}, [switchWindow]);
	return <button onClick={handleClick} {...props} />;
};

export default StartWindow;
