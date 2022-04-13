import React, { useState } from 'react';
import { QuestionDifficult } from '../../data/questions';
import { checkAnswer, getRandomQuestion, TgetQuestion } from '../../components/questions/';
import '../../components/questions/style.css';
import Timer from '../../components/Timer/Timer';
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap';

const passQuestions: number[] = [];
const firstQuestion: TgetQuestion = getRandomQuestion(QuestionDifficult.easy, passQuestions);

const GameWindow: React.FC = () => {
	const [[questionText, questionVariants, questionId], setQuestion] = useState(firstQuestion);

	const handelClick = (index: number) => {
		const isRigth = checkAnswer(questionId, index);
		if (!isRigth) {
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
			<div className="game-controls">
				<Timer paused={false} duration={30} onTimeExpiration={() => console.log('expired')} />
				<LevelRoadmap currentLevel={passQuestions.length + 1} safetyLevels={[5, 10, 15]} />
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
								<button className="question__answer-btn" onClick={() => handelClick(variant.id)}>
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
