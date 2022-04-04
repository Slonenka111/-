import React, {useState} from 'react';
import {QuestionDifficult} from '../../data/questions';
import {checkAnswer, getRandomQuestion, TgetQuestion} from '../../components/questions/';
import '../../components/questions/style.css';
import Timer from "../../components/Timer/Timer";

const passQuestions: number[] = [];
const firstQuestion: TgetQuestion = getRandomQuestion(QuestionDifficult.easy, passQuestions);

const GameWindow: React.FC = () => {
	const [[questionText, questionVariants, questionId], setQuestion] = useState(firstQuestion);

	const handleClick = (index: number) => {
		const isRight = checkAnswer(questionId, index);
		if (!isRight) {
			console.log('Не правильно!');
			return;
		}
		const difficult =
			passQuestions.length < 4
				? QuestionDifficult.easy
				: passQuestions.length < 9
					? QuestionDifficult.medium
					: QuestionDifficult.hard;
		passQuestions.push(questionId);
		setQuestion(getRandomQuestion(difficult, passQuestions));
	};

	return (
		<div>
			<div className="timer__container">
				<Timer paused={false} duration={30}
					   onTimeExpiration={() => console.log("expired")}/>
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
							<div className="question__item">
								<button className="question__answer-btn"
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
