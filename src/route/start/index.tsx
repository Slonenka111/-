import React, { useCallback, useContext } from 'react';
import logo from '../../assets/images/logo.png';
import logoWebp from '../../assets/images/logo.webp';
import logoOptimizeWebp from '../../assets/images/logo_optimize.webp';
import star from '../../assets/icon/star.svg';
import './start.scss';
import { GameContext, WindowState } from '../../store/game-context';

const StartWindow: React.FC = () => {
	return (
		<div className="start-window container">
			<div className="start-window__img">
				<div className="start-window__img-wrapper">
					<img src={star} alt="star" className='start-window__img-star' />
				</div>
				<img
					className="start-window__img-logo"
					alt="millioner project logo"
					srcSet={`${logoOptimizeWebp}, ${logoWebp} 2x`}
					src={logo}
				/>
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
					<button className="button__item button__item--bold" onClick={handleClick} {...props} />
				</div>
			</div>
		</div>
	);
};

export default StartWindow;
