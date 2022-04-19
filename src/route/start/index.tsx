import React, { useCallback, useContext } from "react";
import logo from "../../assets/images/logo.png";
import logoOptimize from "../../assets/images/logo_optimize.png";
import "./start.scss";
import '../../components/button/style.scss'
import { GameContext, WindowState } from "../../store/game-context";

const StartWindow: React.FC = () => {
	return (
		<div className="start-window">
			<div className="start-window__img">
				<div className="start-window__img-wrapper">
					<div className="start-window__img-line" />
					<div className="start-window__img-line" />
					<div className="start-window__img-line" />
					<div className="start-window__img-line" />
					<div className="start-window__img-line" />
					<div className="start-window__img-line" />
				</div>
				<img className="start-window__img-logo"
					 alt="millioner project logo"
					 srcSet={`${logoOptimize}, ${logo} 2x`}
					 src={logo} />
			</div>
			<div className="start-window__btn">
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
	return (
		<div className="button__container">
			<div className="button__container-item">
				<div className="button__wrapper">
					<button className="button__item" onClick={handleClick} {...props} />
				</div>
			</div>
		</div>
	);
};

export default StartWindow;
