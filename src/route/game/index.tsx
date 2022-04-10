import React, { useContext, useState } from "react";
import { QuestionDifficult } from "../../data/questions";
import { checkAnswer, getRandomQuestion } from "../../components/questions/";
import "../../components/questions/style.css";
import { GameContext } from "../../store/game-context";


// const firstQuestion: TgetQuestion = getRandomQuestion(QuestionDifficult.easy, passQuestions);

const GameWindow: React.FC = () => {
	const { addQuestionNumber, completeQuestions, passQuestions } = useContext(GameContext);

	const [[questionText, questionVariants, questionId], setQuestion] = useState(getRandomQuestion(QuestionDifficult.easy, passQuestions));

	const handelClick = (index: number) => {
		const isRight = checkAnswer(questionId, index);
		if (!isRight) {
			console.log("Не правильно!");
			return;
		}
		const difficult =
			passQuestions.length < 4
				? QuestionDifficult.easy
				: passQuestions.length < 9
					? QuestionDifficult.medium
					: QuestionDifficult.hard;
		// passQuestions.push(questionId);
		completeQuestions(questionId);
		addQuestionNumber();
		setQuestion(getRandomQuestion(difficult, passQuestions));
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
