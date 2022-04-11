import React, { useContext } from "react";
import "../../components/questions/style.css";
import { GameContext } from "../../store/game-context";

const GameWindow: React.FC = () => {
	const {
		addQuestionNumber,
		completeQuestions,
		changeDifficult,
		getQuestion,
		questionText,
		questionVariants,
		questionId,
		approvedAnswer
	} = useContext(GameContext);


	const handelClick = (index: number) => {
		if (!approvedAnswer?.(questionId, index)) {
			console.log("Не правильно!");
			return;
		}
		addQuestionNumber();
		completeQuestions(questionId);
		changeDifficult();
		getQuestion();
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
							<button className="question__answer-btn"
									onClick={() => handelClick(variant.id)}>
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
