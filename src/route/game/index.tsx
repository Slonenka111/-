import React, { useCallback, useContext, useState } from "react";
import "../../components/questions/style.css";
import { GameContext } from "../../store/game-context";
import Timer from '../../components/Timer/Timer';
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap';

const GameWindow: React.FC = () => {
	const [isDisabled, setIsDisabled] = useState(false);

	const toggleIsDisabled = useCallback(() => {
		setIsDisabled(prevState => !prevState);
	}, [setIsDisabled]);

	const {
		questionNumber,
		questionText,
		questionVariants,
		gameMove
	} = useContext(GameContext);

	const handleClick = (index: number) => {
		toggleIsDisabled();
		setTimeout(() => {
			toggleIsDisabled();
			gameMove(index);
		}, 1000);
	};

	return (
		<div>
			<div className="game-controls">
				<Timer paused={false} duration={30} onTimeExpiration={() => console.log('expired')} />
				<LevelRoadmap currentLevel={questionNumber + 1} safetyLevels={[5, 10, 15]} />
			</div>
			<div className="question">
				<div className="question__container--title">
					<div className="question__item--title">
						<div className="question__title">{questionText}</div>
					</div>
				</div>
				<div className="question__container">
					{questionVariants.map((variant) => {
						return (
							<div className="question__item" key={variant.id}>
								<button className="question__answer-btn" disabled={isDisabled}
										onClick={() => handleClick(variant.id)}>
									{variant.text}
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default GameWindow;
