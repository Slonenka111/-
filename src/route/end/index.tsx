import React, { useContext } from 'react';
import { GameContext } from '../../store/game-context';
import { ResultGame } from '../../components/context';
import { levels } from '../../components/LevelRoadmap/LevelRoadmap';
import './style.scss';

const EndWindow: React.FC = () => {
	const { clearStates, questionNumber, resultGame, score } = useContext(GameContext);

	const moneyPrize =
		questionNumber < 5
			? 0
			: questionNumber < 10
			? levels[4].cost
			: questionNumber < 15
			? levels[9].cost
			: levels[14].cost;

	return (
		<div className="container end-window">
			<h1 className="end-window__title">
				{resultGame === ResultGame.lose && 'В следующий раз тебе обязательно повезет!'}
				{resultGame === ResultGame.win && 'Ты стал миллионером!'}
				{resultGame === ResultGame.expired && 'Время вышло!'}
			</h1>
			<div className="end-window__reward">
				Твой счет:
				<span className="text--primary"> {score}</span>
			</div>
			<div className="end-window__reward">
				Выигрыш:
				<span className="text--primary"> $ {moneyPrize}</span>
			</div>

			<div className="end-window__btn">
				<div className="button__container">
					<div className="button__container-item">
						<div className="button__wrapper">
							<button className="button__item button__item--bold" onClick={clearStates}>
								Попробовать снова
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EndWindow;
