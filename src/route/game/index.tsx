import React, { useCallback, useContext, useState } from "react";
import "../../components/questions/style.css";
import { GameContext } from "../../store/game-context";

const GameWindow: React.FC = () => {
	const [isDisabled, setIsDisabled] = useState(false);

	const toggleIsDisabled = useCallback(() => {
		setIsDisabled(prevState => !prevState);
	}, [setIsDisabled]);

	const {
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
	);
};

export default GameWindow;
